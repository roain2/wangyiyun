<template>
  <!-- 搜索专辑页 -->
  <div class="searchAlbum">
    <!-- 专辑总数 -->
    <div class="count">找到 {{pageInfo.total}} 张专辑</div>
    <!-- 专辑列表 -->
    <div class="albums" v-loading="isLoading">
      <CPlaylist :playlists="albums" :type="'album'" />
      <CPagination :page-info="pageInfo" :handle-change="getSearchAlbum" />
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
let albums = ref()

async function getSearchAlbum() {
  isLoading.value = true
  const res: any = await searchApi(keywords.value, 10, (pageInfo.curPage - 1) * 30)
  pageInfo.total = res.result.albumCount
  albums.value = res.result.albums
  isLoading.value = false
}

getSearchAlbum()
</script>

<style lang="less">
.searchAlbum {
  width: 100%;

  .count {
    margin-left: 1rem;
    font-weight: 600;
  }
}
</style>