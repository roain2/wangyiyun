<template>
  <!-- 粉丝列表 -->
  <div class="followeds">
    <div class="title">粉丝列表(最多显示99位)</div>
    <CUserlist :userlist="followedsList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { userFollowedsApi } from '@/api/user'
import CUserlist from '@/components/common/CUserlist.vue'

const route = useRoute()

let followedsList: any = ref([])

async function getFolloweds() {
  const res: any = await userFollowedsApi(route.params.id)
  followedsList.value.push(...res.followeds)
}

getFolloweds()
</script>

<style lang="less" scoped>
.followeds {
  width: 100%;

  .title {
    font-weight: 600;
    font-size: 20px;
  }
}
</style>