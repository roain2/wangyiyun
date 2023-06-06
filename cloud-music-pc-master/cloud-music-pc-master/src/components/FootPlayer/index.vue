<template>
  <!-- 播放器 -->
  <div class="player">
    <!-- 歌曲信息 -->
    <div class="left" @click="store.showSongDetails=!store.showSongDetails">
      <div class="img">
        <el-image :src="store.curSongInfo.al.picUrl">
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
      <div class="name">
        {{store.curSongInfo.name}}
      </div>
      <!-- 歌曲详情页 -->
      <el-drawer v-model="store.showSongDetails" :with-header="false" direction="btt" :append-to-body="true"
        :size="'100%'">
        <song-details />
      </el-drawer>
    </div>
    <!-- 歌曲控制 -->
    <div class="center">
      <!-- 控制 -->
      <div class="control">
        <!-- 循环模式 -->
        <div class="cycleMode" @click="switchLoopMode">
          <i class="iconfont icon-xunhuanbofang" v-if="loopMode=='loop'"></i>
          <i class="iconfont icon-suijibofang" v-if="loopMode=='random'"></i>
          <i class="iconfont icon-danquxunhuan" v-if="loopMode=='cycle'"></i>
        </div>
        <div class="prev" @click="prevSong">
          <i class="iconfont icon-shangyishoushangyige"></i>
        </div>
        <div class="isPlay" id="isPlay" @click="handlePlay">
          <i v-if="!store.isPlaying" class="iconfont icon-bofang"></i>
          <i v-else class="iconfont icon-zanting"></i>
        </div>
        <div class="next" @click="nextSong">
          <i class="iconfont icon-xiayigexiayishou"></i>
        </div>
        <!-- 收藏 -->
        <div class="love">
          <i class="iconfont icon-shoucang"></i>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <div class="curTime">{{ curTime }}</div>
        <el-slider v-model="store.curDuration" :max="duration" @change="changeDuration" :show-tooltip="false" />
        <div class="endTime">{{ endTime }}</div>
      </div>
    </div>
    <!-- 音量和播放列表 -->
    <div class="right">
      <!-- 音量控制 -->
      <div class="volume">
        <!-- 是否静音 -->
        <div class="mute" @click="isMute=!isMute">
          <i v-if="!isMute" class="iconfont icon-shengyin"></i>
          <i v-else class="iconfont icon-shengyinjingyin"></i>
        </div>
        <el-slider v-model="curVolume" @change="changeVolume" :show-tooltip="false" :max="100">
        </el-slider>
      </div>
      <!-- 播放列表 -->
      <div class="playlist" @click="store.showPlaylist=!store.showPlaylist">
        <el-badge :value="store.playlist.length">
          <i class="iconfont icon-24gf-playlistMusic4"></i>
        </el-badge>
        <!-- 抽屉 -->
        <el-drawer v-model="store.showPlaylist" :with-header="false" :append-to-body="true" :size="320">
          <song-table />
        </el-drawer>
      </div>
    </div>
    <!-- 播放音乐的核心组件 autoplay-->
    <audio ref="audioPlayer" :src="store.curSongUrl" @timeupdate="timeupdate" :autoplay="store.isPlaying"></audio>
    <!-- 弹出层，查看播放歌曲列表 -->
  </div>
</template>


<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { computed, ref, watch } from 'vue';
import { msToMinSeconed } from '@/utils/time'
import { ElMessage } from 'element-plus';
import SongTable from './SongTable.vue'
import SongDetails from './SongDetails.vue'

const store = usePlayerStore()

// 控制audio的Ref
let audioPlayer = ref()
// 循环模式 loop random cycle
let loopMode = ref('loop')


// 当前时间 字符串
let curTime = computed(() => {
  return msToMinSeconed(store.curDuration)
})
// 总时间 毫秒
let duration = computed(() => {
  return store.curSongInfo.dt || 0
})
// 总时间 字符串
let endTime = computed(() => {
  return msToMinSeconed(duration.value)
})

// 切换循环模式
function switchLoopMode() {
  if (loopMode.value == 'loop') {
    loopMode.value = 'random'
    ElMessage.success('切换为随机播放模式')
  } else if (loopMode.value == 'random') {
    loopMode.value = 'cycle'
    ElMessage.success('切换为单曲循环播放模式')
  } else {
    loopMode.value = 'loop'
    ElMessage.success('切换为顺序循环播放模式')
  }
}

// 播放/暂停
function handlePlay() {
  if(store.curSongUrl == ''){
    ElMessage.warning('当前无音乐播放')
    return 
  }
  store.isPlaying = !store.isPlaying
  if (store.isPlaying) {
    audioPlayer.value.play()
  } else {
    audioPlayer.value.pause()
  }
}

// 拖动进度条
function changeDuration(val: number) {
  // 如果有播放音乐
  if (store.curSongUrl) {
    store.curDuration = val
    audioPlayer.value.currentTime = val / 1000
  } else {
    store.curDuration = 0
    ElMessage.warning('无可播放歌曲，无法进行操作')
  }
}

// 上一首
function prevSong() {
  // 顺序循环和单曲循环都是单位1
  if (loopMode.value == 'loop' || loopMode.value == 'cycle') {
    // 如果是第一首的上一首就是最后一首
    store.index = store.index == 0 ? store.playlist.length - 1 : store.index - 1
  } else if (loopMode.value == 'random') {
    store.index = Math.floor(Math.random() * store.playlist.value.length)
  }
  store.updateCurSong()
}

// 下一首
function nextSong() {
  if (loopMode.value == 'loop' || loopMode.value == 'cycle') {
    // 如果是最后一首的下一首就是第一首
    store.index = store.index == store.playlist.length - 1 ? 0 : store.index + 1
  } else if (loopMode.value == 'random') {
    store.index = Math.floor(Math.random() * store.playlist.length)
  }
  store.updateCurSong()
}

// 监听切换歌曲
watch(
  () => store.curSongUrl, (val, oldVal) => {
    // 切换的歌曲，更新为0, 且默认播放
    if (val != oldVal) {
      store.curDuration = 0
      store.isPlaying = true
    }
  },
)

// 是否静音控制
let isMute = ref(false)
// 当前音量大小 默认100
let curVolume = ref(100)
// 拖动音量进度条
function changeVolume(val: number) {
  curVolume.value = val
  audioPlayer.value.volume = val / 100
}
// 监听是否是静音
watch(
  () => isMute.value, () => {
    if (isMute.value) {
      audioPlayer.value.volume = 0
    } else {
      audioPlayer.value.volume = curVolume.value / 100
    }
  }
)

// 播放音乐自动触发
function timeupdate(e: any) {
  // 更新歌曲的当前播放时长
  store.curDuration = e.target.currentTime * 1000

  // 判断歌曲是否为试听歌曲
  if (e.target.ended && curTime.value < endTime.value) {
    ElMessage.warning('VIP歌曲,试听结束！！！')
    // 暂停播放
    store.isPlaying = false
  }

  // 当歌曲播放完毕后，并根据歌曲的循环方式进行操作
  if (e.target.ended && curTime.value == endTime.value) {
    store.isPlaying = false
    if (loopMode.value == 'cycle') {
      // 单曲循环自动下一首还是本首
      e.target.currentTime = 0
      store.curDuration = 0
    } else {
      nextSong()
    }
  }
}
</script>

<style lang="less">
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #eee;
  background-color: #fff;
  z-index: 9999 !important;
  padding: 0 1rem;
  cursor: default;

  .left {
    width: 25%;
    display: flex;
    align-items: center;
    cursor: pointer;

    .el-image {
      height: 3rem;
      width: 3rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
    }

    .name {
      font-size: 14px;
    }
  }

  .center {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .control {
      width: 60%;
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        cursor: pointer;

        i {
          font-size: 20px;
        }
      }

      #isPlay i {
        font-size: 34px;
      }
    }

    .progressBar {
      width: 90%;
      height: 40%;
      display: flex;
      align-items: center;

      .curTime,
      .endTime {
        font-size: 13px;
        margin: 0 10px;
        color: #888;
      }
    }
  }


  .right {
    width: 25%;
    display: flex;
    align-items: center;
    padding-left: 6rem;

    .volume {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 7rem;

      i {
        font-size: 24px;
        margin-right: 1rem;
      }
    }

    .playlist {
      cursor: pointer;
      position: absolute;
      right: 2.5rem;

      .el-badge i {
        font-size: 20px;
      }
    }
  }
}
</style>