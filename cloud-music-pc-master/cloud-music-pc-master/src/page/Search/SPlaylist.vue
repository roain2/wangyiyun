<template>
  <!-- 搜索歌单页 -->
  <div class="searchPlaylist">
    <!-- 歌单总数 -->
    <div class="count">找到 {{pageInfo.total}} 张歌单</div>
    <!-- 歌单列表 -->
    <div class="playlists" v-loading="isLoading">
      <CPlaylist :playlists="playlists" :type="'playlist'" />
      <CPagination :page-info="pageInfo" :handle-change="getSearchPlaylist" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { searchApi } from '@/api/search'
import CPlaylist from '@/components/common/CPlaylist.vue'
import CPagination from '@/components/common/CPagination.vue'
const route = useRoute()

const keywords = computed(() => {
  return route.params.keywords
})

const pageInfo = reactive({
  pageSize: 30,
  curPage: 1, // 当前页
  total: 0, // 总页数
})

let isLoading = ref(true)

// 歌单列表
let playlists = ref()

async function getSearchPlaylist() {
  isLoading.value = true
  const res: any = await searchApi(keywords.value, 1000, (pageInfo.curPage - 1) * 30)
  pageInfo.total = res.result.playlistCount
  res.result.playlists.forEach((item: any) => {
    item.picUrl = item.coverImgUrl
  })
  playlists.value = res.result.playlists
  isLoading.value = false
}

getSearchPlaylist()
</script>

<style lang="less">
.searchPlaylist {
  width: 100%;

  .count {
    margin-left: 1rem;
    font-weight: 600;
  }
}
</style>