<template>
  <!-- 封装video列表 -->
  <div class="videoList">
    <div class="item" v-for="video in videoData" :key="video.id" @click="toVideoDetails(video.id)">
      <!-- 播放量 -->
      <div class="count">
        <i class="iconfont">&#xe606;</i>
        <span>{{(video.playCount/10000).toFixed(1)}}万</span>
      </div>
      <el-image :src="video.cover">
        <template #placeholder>
          <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
      </el-image>
      <div class="name">
        <span>{{video.name}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const { videoData } = defineProps(['videoData'])

function toVideoDetails(id: number) {
  router.push({
    name: 'videoDetails',
    params: { id }
  })
}
</script>

<style lang="less" scoped>
.videoList {
  display: grid;
  // 每行5个
  grid-template-columns: repeat(4, 1fr);

  .item {
    margin: 0.5rem;
    cursor: pointer;
    position: relative;

    .count {
      position: absolute;
      display: flex;
      right: 1rem;
      top: 0.5rem;
      z-index: 1;
      color: #eee;
    }

    .el-image {
      width: 100%;
      min-height: 7rem;
      max-height: 9rem;
      border-radius: 1rem;
    }

    span {
      display: block;
      text-align: center;
      font-size: 13px;
      padding-bottom: 0.5rem;
    }
  }
}
</style>