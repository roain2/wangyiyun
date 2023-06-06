<template>
  <!-- 歌曲详情页 -->
  <div class="songDetails">
    <div class="details">
      <!-- 收起抽屉 -->
      <el-icon class="packUp" @click="store.showSongDetails=false">
        <ArrowDownBold />
      </el-icon>
      <!-- 唱盘部分 -->
      <div class="left">
        <!-- 磁针 -->
        <div class="needle" :class="{needle:true, crush: store.isPlaying }">
          <img src="./img/needle.png" />
        </div>
        <!-- 外圈磁盘 -->
        <div class="outer">
          <img src="./img/disc.png" :class="{ rotate_active: store.isPlaying, rotate_pause: !store.isPlaying }" />
        </div>
        <!-- 内圈唱盘 -->
        <div class="inner">
          <img :src="store.curSongInfo.al.picUrl"
            :class="{ rotate_active: store.isPlaying, rotate_pause: !store.isPlaying }" />
        </div>
      </div>
      <div class="right">
        <!-- 歌曲信息 -->
        <div class="songInfo">
          <p class="name">{{store.curSongInfo.name}}</p>
          <p class="author">
          <p v-for="ar in store.curSongInfo.ar">{{ar.name}}</p>
          </p>
        </div>
        <!-- 歌词部分 -->
        <div class="lyric" ref="lyric">
          <p v-for="(item, index) in store.lyric" :key="index"
            :class="{active:store.curDuration >= item.time && store.curDuration <= item.next}">
            {{ item.lrc }}
          </p>
        </div>
      </div>
    </div>
    <!-- 歌曲评论 -->
    <div class="comment" v-show="store.curSongInfo.id">
      <CComments :type="'song'" :id="store.curSongInfo.id" :key="store.curSongInfo.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { onMounted, onUnmounted, ref } from 'vue'
import CComments from '@/components/common/CComments.vue'

const store = usePlayerStore()

// 歌词
let lyric = ref()

let timer: NodeJS.Timer
// 歌词滚动逻辑
onMounted(() => {
  // 歌词滚动1s刷新一次
  timer = setInterval(() => {
    // 获取播放到的歌词元素
    let p: any = document.querySelector("p.active");
    if (p && p.offsetTop > 300) {
      // 改变父元素的顶部位置
      lyric.value.scrollTop = p.offsetTop - 300;
    }
  }, 1000)
})

onUnmounted(() => {
  // 销毁前破坏定时器
  clearInterval(timer)
})
</script>

<style lang="less">
.songDetails {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, #ec4141 0%, rgb(242, 199, 199) 20%, #eee 80%, #fff 100%);

  .details {
    width: 100%;
    height: 600px;
    display: flex;

    .el-icon {
      position: absolute;
      cursor: pointer;
      top: 1rem;
      left: 2rem;
      font-size: 24px;
      z-index: 1;
    }

    .left {
      width: 40%;
      height: 500px;
      position: relative;

      .needle {
        position: absolute;
        left: 16rem;
        top: 4rem;
        width: 8rem;
        transform: rotate(0deg);
        // 转动原点
        transform-origin: 0.5rem 0.5rem;
        transition: all 1s;
        z-index: 1;

        img {
          width: 100%;
        }
      }

      .crush {
        transform: rotateZ(20deg);
      }

      .outer {
        position: absolute;
        top: 10rem;
        left: 8rem;
        width: 18rem;
      }

      .inner {
        position: absolute;
        top: 12.7rem;
        left: 10.7rem;
        width: 12.5rem;
      }

      // 图片转动
      @keyframes rotate_360 {
        0% {
          transform: rotateZ(0deg);
        }

        100% {
          transform: rotateZ(360deg);
        }
      }

      .outer,
      .inner {
        .rotate_active {
          animation-play-state: running;
        }

        .rotate_pause {
          animation-play-state: paused;
        }

        img {
          animation: rotate_360 10s linear infinite;
          width: 100%;
          border-radius: 50%;
        }
      }

    }

    .right {
      width: 60%;
      height: 500px;
      padding-right: 10%;

      .songInfo {
        width: 100%;
        height: 100px;
        margin-top: 3rem;
        text-align: center;

        .name {
          font-weight: 600;
          font-size: 24px;
          margin-bottom: 0.5rem;
        }
      }

      .lyric {
        width: 100%;
        height: 400px;
        padding: 1rem 0;
        text-align: center;
        overflow-y: auto;

        p {
          margin-bottom: 1rem;
          font-size: 14px;
        }

        .active {
          color: #ec4141;
        }
      }
    }
  }

  .comment {
    padding: 0 1.5rem;
  }
}
</style>