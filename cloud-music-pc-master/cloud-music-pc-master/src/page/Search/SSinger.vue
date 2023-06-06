<template>
  <!-- 搜索歌手页 -->
  <div class="searchSinger">
    <!-- 歌手总数 -->
    <div class="count">找到 {{pageInfo.total}} 位歌手</div>
    <!-- 歌手展示 -->
    <div class="singerlist" v-loading="isLoading">
      <!-- 歌手列表 -->
      <CSingerList :singerlist="singerlist" />
      <!-- 分页 -->
      <CPagination :page-info="pageInfo" :handle-change="getSearchSinger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { searchApi } from '@/api/search'
import CPagination from '../../components/common/CPagination.vue'
import CSingerList from '../../components/common/CSingerList.vue'

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

// 歌手列表
let singerlist = ref()

async function getSearchSinger() {
  isLoading.value = true
  const res: any = await searchApi(keywords.value, 100, (pageInfo.curPage - 1) * 30)
  pageInfo.total = res.result.artistCount
  singerlist.value = res.result.artists
  console.log(singerlist.value)
  isLoading.value = false
}

getSearchSinger()
</script>

<style lang="less">
.searchSinger {
  width: 100%;

  .count {
    margin-left: 1rem;
    font-weight: 600;
  }
}
</style>