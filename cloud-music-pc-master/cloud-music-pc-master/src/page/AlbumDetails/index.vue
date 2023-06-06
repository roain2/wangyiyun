<template>
  <!-- 专辑详情页 -->
  <div class="albumDetails">
    <div class="top">
      <!-- 专辑封面 -->
      <div class="left">
        <img :src="album.blurPicUrl" />
      </div>
      <!-- 专辑信息 -->
      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <span class="tag">专辑</span>
          <span class="name">{{ album.name }}</span>
        </div>
        <!-- 操作 -->
        <div class="operate">
          <el-button type="danger" @click="playAll" id="playAll">
            <i class="iconfont icon-24gl-playCircle"></i>
            <span>播放全部</span>
          </el-button>
          <el-button type="danger" plain>
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
          </el-button>
          <el-button type="danger" plain>
            <i class="iconfont icon-fenxiang"></i>
            <span>分享</span>
          </el-button>
        </div>
        <!-- 歌手 -->
        <div class="singer" v-if="album.artists">
          歌手：
          <span v-for="(ar, index) in album.artists" :key="index">
            {{ ar.name}}
          </span>
        </div>
        <!-- 时间 -->
        <div class="time">
          发布时间：{{ timestampToDate(album.publishTime) }}
        </div>
      </div>
    </div>
    <el-tabs v-model="selectedTag" class="albumContent" v-loading="isLoading">
      <el-tab-pane label="专辑歌曲" name="songs">
        <CSonglist :songlist="songlist" />
      </el-tab-pane>
      <el-tab-pane label="专辑评论" name="comments">
        <CComments :type="'ablum'" :id="id" />
      </el-tab-pane>
      <el-tab-pane label="专辑描述" name="descrip">
        <div class="description">{{ album.description }}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { albumDetailsApi } from '@/api/album'
import { timestampToDate } from '@/utils/time'
import CSonglist from '@/components/common/CSonglist.vue'
import CComments from '@/components/common/CComments.vue'

const route = useRoute()
const store = usePlayerStore()

const id = computed(() => route.params.id)

let isLoading = ref(true)

let selectedTag = ref('songs')

// 专辑详情
let album = ref({
  blurPicUrl: '',
  name: '',
  artists: [{ name: '' }],
  publishTime: '',
  description: ''
})

// 专辑里面的歌曲
let songlist = ref()

async function getAlbumDetails() {
  isLoading.value = true
  const res: any = await albumDetailsApi(id.value)
  album.value = res.album
  songlist.value = res.songs
  isLoading.value = false
}


function playAll() {
  // 切换到本歌单
  if (songlist.value != store.playlist) {
    store.playlist = songlist.value
  }
  store.index = 0
  store.isPlaying = false
  store.updateCurSong()
}

getAlbumDetails()
</script>

<style lang="less">
.albumDetails {
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .left img {
      height: 10rem;
      width: 10rem;
      border-radius: 1rem;
      margin: 0 1rem;
    }

    .right {
      align-items: center;
      margin-bottom: 1rem;

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .tag {
          display: block;
          height: 1.5rem;
          width: 4rem;
          color: #ec4141;
          font-size: 15px !important;
          text-align: center;
          border: 1px solid #ec4141;
          border-radius: 5px;
          margin-right: 0.5rem;
        }

        .name {
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
      }

      .operate {
        margin-bottom: 0.5rem;

        #playAll i {
          font-size: 22px;
        }

        span {
          margin-left: 0.5rem;
        }
      }

      .singer,
      .time {
        margin-top: 0.5rem;
        font-size: 14px;
        color: #444;
      }
    }

  }

  .albumContent {
    height: 100%;

    .description {
      font-size: 14px;
      color: #373737;
      line-height: 1.5rem;
      // letter-spacing 属性增加或减少字符间的空白（字符间距）
      letter-spacing: 1px;
      // 首行缩进
      text-indent: 2rem;
    }
  }
}
</style>