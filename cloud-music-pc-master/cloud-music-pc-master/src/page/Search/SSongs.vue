<template>
  <!-- 搜索单曲页 -->
  <div class="searchSongs">
    <!-- 歌曲总数 -->
    <div class="count">找到 {{pageInfo.total}} 首单曲</div>
    <!-- 歌曲展示 -->
    <div class="songs" v-loading="isLoading">
      <!-- 歌曲列表 -->
      <CSonglist :songlist="songlist" />
      <!-- 分页 -->
      <CPagination :page-info="pageInfo" :handle-change="getSearchSongs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import CSonglist from '@/components/common/CSonglist.vue'
import { usePlayerStore } from '@/stores/player'
import { searchApi } from '@/api/search'
import CPagination from '../../components/common/CPagination.vue'
const route = useRoute()
const store = usePlayerStore()

const keywords = computed(() => {
  return route.params.keywords
})

let isLoading = ref(true)

const pageInfo = reactive({
  pageSize: 30,
  curPage: 1, // 当前页
  total: 0, // 总页数
})

let songlist = ref()

async function getSearchSongs() {
  isLoading.value = true
  const res: any = await searchApi(keywords.value, 1, (pageInfo.curPage - 1) * 30)
  // 更新歌曲数量
  pageInfo.total = res.result.songCount
  // 更新歌曲
  songlist.value = res.result.songs
  isLoading.value = false
}

getSearchSongs()
</script>

<style lang="less">
.searchSongs {
  width: 100%;

  .count {
    margin-left: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
}
</style>