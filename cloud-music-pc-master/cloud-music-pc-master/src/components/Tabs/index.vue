<template>
  <div class="tabs">
    <el-tabs v-model="currentName" @tab-click="handleClick">
      <!-- 循环遍历主内容区导航分类的内容 -->
      <el-tab-pane v-for="(t,index) in tabs" :key="index" :label="t.label" :name="t.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineProps } from "vue";
const route = useRoute()
const router = useRouter()

const { tabs } = defineProps(['tabs'])

// 定义变量 name用来保存当前页面的路径
let currentName = computed({
  get() {
    return route.name
  },
  set(val) {
    return val
  },
})

function handleClick(tab: any, event: Event) {
  router.push({ name: tabs[tab.index].name })
}
</script>

<style lang="less">
.tabs {
  margin-left: 1rem;
  margin-bottom: 0.5rem;

  .el-tabs {
    .el-tabs__nav-wrap {

      .el-tabs__item {
        font-size: 16px;

        &:hover {
          color: black;
        }
      }

      .el-tabs__active-bar {
        background-color: #e13e3e;
        height: 0.2rem;
      }

      .is-active {
        font-size: 24px !important;
        font-weight: bolder;
        color: black;
      }

      &::after {
        background-color: white;
      }
    }
  }
}
</style>

