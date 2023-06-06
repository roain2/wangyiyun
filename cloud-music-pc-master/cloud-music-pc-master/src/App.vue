<template>
  <el-container class="layout">
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside width="12%">
        <Aside />
      </el-aside>
      <el-main>
        <!-- 加入:key="route.fullPath" 在相同路径下变换参数也会刷新页面 -->
        <RouterView v-slot="{ Component }" :key="route.fullPath">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </RouterView>
      </el-main>
    </el-container>
    <el-footer>
      <FootPlayer />
    </el-footer>
    <!-- 回到顶部 -->
    <el-backtop target=".layout" :bottom="120"></el-backtop>
  </el-container>
</template>

<script setup lang="ts">
import Header from "./components/Header/index.vue";
import Aside from './components/Aside/index.vue'
import FootPlayer from './components/FootPlayer/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

img {
  vertical-align: top;
  border: none;
}

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.layout {
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  .el-header {
    width: 100%;
    height: 60px;
    padding: 0;
  }

  .el-container {
    width: 100%;

    .el-main {
      width: 100%;
    }
  }

  .el-footer {
    padding: 0;
  }
}

// 清除浮动
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

// 图片加载失败
.el-image {
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
  }
}

// 美化进度条
.el-slider {
  width: 100%;
  --el-slider-main-bg-color: #ff4040;
  --el-slider-button-size: 0.8rem;
}

// 美化 回到顶部
.el-backtop i {
  color: #ec4141;
}

.el-backtop:hover {
  background-color: #fdf5f5;
}

// 美化抽屉
.el-drawer.rtl {
  height: calc(100vh - 60px);
}

.el-drawer.rtl .el-drawer__body,
.el-drawer.btt .el-drawer__body {
  padding: 0;
}

.el-drawer.rtl .el-drawer__body::-webkit-scrollbar {
  width: 5px;
}


// 美化滚动条
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  width: 4px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, .5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, .3);
}

// 美化tab标签
.el-tabs {
  .el-tabs__nav-wrap {

    .el-tabs__item {
      font-size: 14px;

      &:hover {
        color: black;
      }
    }

    .el-tabs__active-bar {
      background-color: #e13e3e;
      height: 0.2rem;
    }

    .is-active {
      font-size: 16px;
      font-weight: bolder;
      color: black;
    }

    &::after {
      background-color: white;
    }
  }
}
</style>
