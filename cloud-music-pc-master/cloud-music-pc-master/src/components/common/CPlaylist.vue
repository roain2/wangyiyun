<template>
  <!-- 封装歌单/专辑列表显示 -->
  <div class="playlists">
    <div class="item" v-for="item in playlists" :key="item.id" @click="toDetailsPage(item.id)">
      <el-card shadow="hover" :body-style="{ padding: '0.5rem'}">
        <el-image :src="item.picUrl">
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
        <div class="name">
          <span>{{item.name}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const { playlists, type } = defineProps(['playlists', 'type'])

function toDetailsPage(id: number) {
  // 传入album跳转albumDetails，否则都跳转playlistDetails
  router.push({
    name: type == 'album' ? 'albumDetails' : 'playlistDetails',
    params: { id }
  })
}
</script>

<style lang="less" scoped>
.playlists {
  display: grid;
  // 每行5个
  grid-template-columns: repeat(5, 1fr);

  .item {
    margin: 0.5rem;
    cursor: pointer;

    .el-image {
      width: 100%;
      min-height: 10rem;
      border-radius: 0.5rem;
    }

    span {
      display: block;
      height: auto;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>