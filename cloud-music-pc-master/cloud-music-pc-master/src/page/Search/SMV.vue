<template>
  <!-- 搜索MV页 -->
  <div class="searchMV">
    <!-- MV总数 -->
    <div class="count">找到 {{pageInfo.total}} 节 MV</div>
    <!-- MV展示 -->
    <div class="mvlist" v-loading="isLoading">
      <CVideoList :video-data="mvs" />
    </div>
    <!-- 分页 -->
    <CPagination :page-info="pageInfo" :handle-change="getSearchMV" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { searchApi } from '@/api/search'
import CPagination from '../../components/common/CPagination.vue'
import CVideoList from '../../components/common/CVideoList.vue'
const route = useRoute()
const store = usePlayerStore()

const keywords = computed(() => {
  return route.params.keywords
})

let isLoading = ref(true)

const pageInfo = reactive({
  pageSize: 24,
  curPage: 1, // 当前页
  total: 0, // 总页数
})

// 存储mvs
let mvs = ref()

async function getSearchMV() {
  isLoading.value = true
  const res: any = await searchApi(keywords.value, 1004, (pageInfo.curPage - 1) * 24, pageInfo.pageSize)
  pageInfo.total = res.result.mvCount
  mvs.value = res.result.mvs
  isLoading.value = false
}

getSearchMV()
</script>

<style lang="less">
.searchMV {
  width: 100%;

  .count {
    margin-left: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
}
</style>