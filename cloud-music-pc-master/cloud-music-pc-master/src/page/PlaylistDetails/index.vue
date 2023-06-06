<template>
  <div class="playlistDetails">
    <!-- 歌单介绍 -->
    <div class="introduce">
      <div class="img">
        <el-image :src="playlistDetails.coverImgUrl" lazy>
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
      <div class="text">
        <!-- 标题 -->
        <div class="title">
          <span class="tag">歌单</span>
          <span class="name">{{ playlistDetails.name }}</span>
        </div>
        <!-- 作者信息 -->
        <div class="authorInfo">
          <el-image :src="playlistDetails.creator.backgroundUrl">
            <template #placeholder>
              <div class="image-slot">加载中<span class="dot">...</span></div>
            </template>
          </el-image>
          <span class="name" @click="toUserDetails(playlistDetails.creator.userId)">
            {{ playlistDetails.creator.nickname}}
          </span>
          <span class="createdDate"> {{ timestampToDate(playlistDetails.createTime) }}创建</span>
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
        <!-- 歌曲数量和播放量 -->
        <div class="count">
          <div class="songsCount">歌曲：{{ playlistDetails.trackCount }}首</div>
          <div class="playCount">
            播放量：{{ (playlistDetails.playCount / 10000).toFixed(1) }}万
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="selectedTag" class="playlistContent" v-loading="isLoading">
      <el-tab-pane label="歌单歌曲" name="songs">
        <CSonglist :songlist="songlist" />
      </el-tab-pane>
      <el-tab-pane label="歌单评论" name="comments">
        <CComments :type="'playlist'" :id="id" />
      </el-tab-pane>
      <el-tab-pane label="歌单描述" name="descrip">
        <div class="description">{{ playlistDetails.description }}</div>
      </el-tab-pane>
    </el-tabs>

    <!-- 回到顶部 -->
    <el-backtop target=".playlistDetails" :bottom="120"></el-backtop>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { playlistDetailsApi, songDetailsApi } from '@/api/playlist'
import { timestampToDate } from '@/utils/time'
import { usePlayerStore } from '@/stores/player'
import CSonglist from '@/components/common/CSonglist.vue'
import CComments from '@/components/common/CComments.vue'

const route = useRoute()
const router = useRouter()
const store = usePlayerStore()

let isLoading = ref(true)

const id = computed(() => route.params.id)

let selectedTag = ref('songs')

// 歌单详情
let playlistDetails: any = ref({
  coverImgUrl: '',
  creator: ''
})
// 歌单中的音乐
let songlist = ref()

// 根据id获取歌单详情
async function getPlaylistDetails() {
  isLoading.value = true
  const res: any = await playlistDetailsApi(id.value)
  playlistDetails.value = res.playlist
  // 获取歌单中的歌曲信息
  await getSongDetails()
  isLoading.value = false
}

// 根据trackIds查询每曲音乐详情
async function getSongDetails() {
  const ids: any = []
  playlistDetails.value.trackIds.forEach((trackId: { id: number }) => {
    ids.push(trackId.id)
  })
  const res: any = await songDetailsApi(ids)
  songlist.value = res.songs
}

async function playAll() {
  // 切换到本歌单
  if (songlist.value != store.playlist) {
    store.playlist = songlist.value
  }
  store.index = 0
  store.isPlaying = false
  store.updateCurSong()
}

function toUserDetails(id: number) {
  router.push({
    name: 'userDetails',
    params: { id }
  })
}


getPlaylistDetails()
</script>

<style lang="less">
.playlistDetails {
  width: 100%;

  .introduce {
    display: flex;
    margin-bottom: 1rem;

    .el-image {
      width: 11rem;
      height: 11rem;
      border-radius: 1rem;
    }

    .text {
      width: calc(100%-12rem);
      margin-left: 2rem;

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

      .authorInfo {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .el-image {
          height: 2rem;
          width: 2rem;
          margin-right: 0.5rem;
        }

        .name {
          color: #6191c2;
          cursor: pointer;
          margin-right: 0.5rem;
        }

        .createdDate {
          font-size: 13px;
          color: #444;
        }
      }

      .operate {
        margin-bottom: 1rem;

        #playAll i {
          font-size: 22px;
        }

        span {
          margin-left: 0.5rem;
        }
      }

      .count {
        display: flex;
        font-size: 14px;
        color: #444;

        .songsCount {
          margin-right: 1rem;
        }
      }
    }
  }

  .playlistContent {

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