<template>
  <!-- 歌手详情页 -->
  <div class="singerDetails">
    <!-- 歌手信息 -->
    <div class="singerInfo">
      <div class="left">
        <img :src="singerInfo.cover" alt="" />
      </div>
      <div class="right">
        <div class="title">
          <span class="tag">歌手</span>
          <span class="name">{{ singerInfo.name }}</span>
        </div>
        <div class="subscription">
          <el-button type="danger" plain><i class="iconfont icon-shoucang"></i>关注</el-button>
        </div>
        <div class="count">
          <span class="songsCount">单曲数：{{ singerInfo.musicSize }}</span>
          <span class="collectionsCount">专辑数：{{ singerInfo.albumSize }}</span>
          <span class="videoCount">MV数：{{ singerInfo.mvSize }}</span>
        </div>

      </div>
    </div>
    <!-- 歌曲、专辑、歌手详情 -->
    <el-tabs v-model="selectedTag" class="singerContent" v-loading="isLoading">
      <el-tab-pane label="热门歌曲" name="hotSongs">
        <div class="title">热门歌曲50首</div>
        <CSonglist :songlist="songlist" />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <CPlaylist :playlists="albums" :type="'album'" />
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <CVideoList :video-data="mvlist" />
        <div class="continueLoading">
          <el-button color='#ed5736' plain @click="continueLoading">点击查看更多</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手描述" name="descrip">
        <div class="description">{{ singerInfo.briefDesc }}</div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { singerDetailsApi, singerHotSongApi, singerAlbumApi, singerMVApi } from '@/api/singer'
import CSonglist from '@/components/common/CSonglist.vue'
import CPlaylist from '@/components/common/CPlaylist.vue'
import CVideoList from '@/components/common/CVideoList.vue'
import { ElMessage } from 'element-plus'
import { mvApi } from '@/api/video'

const route = useRoute()
const store = usePlayerStore()

const id = computed(() => {
  return route.params.id
})

let isLoading = ref(true)
// 选择的标签
let selectedTag = ref('hotSongs')

// 歌手信息
let singerInfo = ref({
  cover: '',
  name: '',
  musicSize: '',
  albumSize: '',
  mvSize: '',
  briefDesc: ''
})

// 歌手热门单曲 
let songlist = ref()
// 歌手专辑
let albums = ref()
// 歌手MV列表
let mvlist: any = ref([])

// 懒加载
const condition = reactive({
  // 当前加载数据的次数（配合实现懒加载）
  count: 1,
  // 每次加载24个
  limit: 24,
  // 是否还有更多数据
  isMore: false
})

// 获取数据
async function getData() {
  isLoading.value = true

  // 获取歌手详情
  const details: any = await singerDetailsApi(id.value)
  singerInfo.value = details.data.artist
  // 获取歌手热门单曲
  const hotSongs: any = await singerHotSongApi(id.value)
  songlist.value = hotSongs.songs

  // 获取完热门单曲就可以展示了
  isLoading.value = false

  // 获取歌手专辑
  const albumRes: any = await singerAlbumApi(id.value)
  albums.value = albumRes.hotAlbums

  getSingerMV()
}

// 获取歌手MV
async function getSingerMV() {
  const mvRes: any = await singerMVApi(id.value, (condition.count - 1) * condition.limit, condition.limit)
  mvRes.mvs.forEach((item: any) => {
    item.cover = item.imgurl
  })
  mvlist.value.push(...mvRes.mvs)
  console.log(mvlist.value)
  condition.isMore = mvRes.hasMore
}

// 继续加载
async function continueLoading() {
  if (condition.isMore) {
    condition.count++
    getSingerMV()
  } else {
    ElMessage.warning('暂无更多数据!')
  }
}

getData()
</script>

<style lang="less">
.singerDetails {
  .singerInfo {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;

    .left {
      margin: 0 1rem;

      img {
        height: 10rem;
        width: 10rem;
        border-radius: 1rem;
      }
    }

    .right {
      margin-left: 1rem;

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

      .subscription {
        i {
          margin-right: 0.5rem;
        }

        margin-bottom: 1rem;
      }

      .count {
        position: relative;
        right: 1rem;

        span {
          margin-left: 1rem;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .singerContent {
    width: 100%;
    height: 100%;

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .continueLoading {
      display: flex;
      justify-content: center;
      padding: 0.5rem;
    }

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