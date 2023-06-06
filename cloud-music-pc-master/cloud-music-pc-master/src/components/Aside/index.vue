<template>
  <!-- 菜单组件 -->
  <el-menu :default-active="route.path" bg-color="red">
    <el-menu-item v-for="menu of menus" :key="menu.name" :index="menu.path" @click="selectMenu(menu)">
      <!-- {{}}和v-text都是文本，v-html才是标签 -->
      <i class="iconfont" v-html="menu.icon"></i>
      <span>{{menu.label}}</span>
    </el-menu-item>
    <el-menu-item-group title="创建的歌单" v-show="userStore.createdPlaylist.length">
      <el-menu-item v-for="(playlist, index) in userStore.createdPlaylist" :index="`/playlistDetails/${playlist.id}`"
        @click=" toPlaylistDetails(playlist.id)">
        <i class="iconfont">&#xe80f;</i>
        {{(index == 0 ? "我喜欢的音乐": playlist.name.slice(0,5) )}}
        <span v-if="playlist.name.length >= 5 && index != 0">...</span>
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="收藏的歌单" v-show="userStore.subscribedPlaylist.length">
      <el-menu-item v-for="playlist in userStore.subscribedPlaylist" :index="`/playlistDetails/${playlist.id}`"
        @click="toPlaylistDetails(playlist.id)">
        <i class="iconfont">&#xe80f;</i>
        {{playlist.name.slice(0,5) }}
        <span v-if="playlist.name.length >= 5 ">...</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const menus = [
  { name: 'recommend', label: '发现音乐', icon: '&#xe609;', path: '/discover/recommend' },
  { name: 'video', label: 'MV视频', icon: '&#xe9f0;', path: '/video' },
  { name: 'dailyStar', label: '每日推荐', icon: '&#xe608;', path: '/dailyStar' },
  { name: 'myMusic', label: '我的音乐', icon: '&#xe601;', path: '/myMusic' },
]

function selectMenu(menu: { path: string, name: string }) {
  if ((menu.name == 'dailyStar' || menu.name == 'myMusic')
    && !localStorage.getItem('cookie')) {
    ElMessage.warning('该页面需要登录才能访问')
  } else {
    router.push(menu.path)
  }
}

function toPlaylistDetails(id: number) {
  router.push({
    name: 'playlistDetails',
    params: { id }
  })
}
</script>

<style lang="less">
.el-menu {
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  i {
    margin-right: 0.1rem;
    font-size: 18px;
  }

  span {
    font-size: 16px;
  }

  // 激活颜色
  .el-menu-item.is-active {
    color: #e13e3e;
  }

  .el-menu-item-group {
    .el-menu-item-group__title {
      font-size: 16px;
    }

    .el-menu-item {
      height: 2.2rem;
      font-size: 14px;
    }
  }
}
</style>