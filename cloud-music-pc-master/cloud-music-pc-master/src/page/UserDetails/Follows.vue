<template>
  <!-- 关注列表 -->
  <div class="follows">
    <div class="title">关注列表(最多显示99位)</div>
    <CUserlist :userlist="followsList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { userFollowsApi } from '@/api/user'
import CUserlist from '@/components/common/CUserlist.vue'

const route = useRoute()

let followsList: any = ref([])

async function getFollows() {
  const res: any = await userFollowsApi(route.params.id)
  followsList.value.push(...res.follow)
}

getFollows()
</script>

<style lang="less" scoped>
.follows {
  width: 100%;

  .title {
    font-weight: 600;
    font-size: 20px;
  }
}
</style>