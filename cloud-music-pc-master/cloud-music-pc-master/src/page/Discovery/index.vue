<template>
  <div class="discover">
    <!-- 选择标签 -->
    <Tabs :tabs="tabs" />
    <!-- Vue3中的 keep-alive让路由组件不被销毁使用方式的变化 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs/index.vue'
const tabs = [
  {
    label: '个性推荐',
    name: 'recommend',
    path: '/discover/recommend',
  },
  {
    label: '歌单',
    name: 'songList',
    path: '/discover/songList',
  },
  {
    label: '排行榜',
    name: 'rank',
    path: '/discover/rank',
  },
  {
    label: '歌手',
    name: 'singer',
    path: '/discover/singer',
  },
]
</script>

