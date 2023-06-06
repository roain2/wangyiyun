<template>
  <div class="recommend" v-loading="isLoading">
    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="14rem" v-if="banners">
        <el-carousel-item v-for="(banner, index) in banners" :key="index">
          <img :src="banner.imageUrl" alt="" @click="handleBanner(banner)" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="personalized">
      <!-- 标题 -->
      <div class="title">
        <span>推荐歌单</span>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
      <!-- 推荐歌单列表 -->
      <Playlist :playlists="playlists" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { bannerApi, personalizedApi } from '@/api/discovery'
import Playlist from '@/components/common/CPlaylist.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

let isLoading = ref(true)
let banners = ref()
// 歌单列表
let playlists = ref()

async function getData() {
  isLoading.value = true
  // 获取banner数据
  const banner: any = await bannerApi()
  banners.value = banner.banners
  // 获取推荐歌单数据
  const res: any = await personalizedApi()
  playlists.value = res.result
  isLoading.value = false
}

// 处理点击banner
function handleBanner(banner: any) {
  console.log(banner)
  // 歌单
  if (banner.targetType == 1000) {
    router.push({
      name: 'playlistDetails',
      params: { id: banner.targetId }
    })
  }
  // 专辑
  else if (banner.targetType == 10) {
    router.push({
      name: 'albumDetails',
      params: { id: banner.targetId }
    })
  }
  // 新歌首发/电台
  else {
    ElMessage.info('特殊Banner,暂时无法处理')
  }
}

// 获取数据
getData()
</script>

<style lang="less" scoped>
.recommend {
  padding: 0 1rem;

  .banner {
    width: 100%;

    .el-carousel__item {
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .personalized {
    width: 100%;

    .title {
      margin-bottom: 0.5rem;
      cursor: default;
      line-height: 24px;
      font-size: 24px;
      font-weight: bold;

      .el-icon {
        position: relative;
        top: 0.2rem;
      }
    }
  }
}
</style>
