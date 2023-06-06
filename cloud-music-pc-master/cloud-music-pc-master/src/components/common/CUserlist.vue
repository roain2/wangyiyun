<template>
  <!-- 封装用户列表 -->
  <div class="userlist">
    <div class="item" v-for="user in userlist" :key="user.userId" @click="toUserDetails(user.userId)">
      <el-image :src="user.avatarUrl">
        <template #placeholder>
          <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
      </el-image>
      <p class="nickname">{{user.nickname}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const { userlist } = defineProps(['userlist'])

function toUserDetails(id: number) {
  router.push({
    name: 'userDetails',
    params: { id }
  })
}
</script>

<style lang="less" scoped>
.userlist {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .item {
    display: flex;
    align-items: center;
    margin: 1rem;
    cursor: pointer;
    border: 1px solid #eee;

    &:hover {
      box-shadow: 0 0 5px #ccc;
    }

    .el-image {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      margin: 0.5rem;
    }
  }
}
</style>