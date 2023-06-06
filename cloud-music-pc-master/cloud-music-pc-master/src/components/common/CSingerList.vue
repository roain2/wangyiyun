<template>
  <!-- 封装歌手列表 -->
  <div class="singerlist">
    <div class="item" v-for="item in singerlist" :key="item.id" @click="toSingerDetails(item.id)">
      <el-card shadow="hover" :body-style="{ padding: '0rem'}">
        <el-image :src="item.img1v1Url">
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
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const { singerlist } = defineProps(['singerlist'])

const router = useRouter()

function toSingerDetails(id: number) {
  router.push({
    name: 'singerDetails',
    params: { id }
  })
}
</script>

<style lang="less" scoped>
.singerlist {
  margin-top: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  .item {
    margin: 0.5rem;
    cursor: pointer;

    .el-image {
      height: 100%;
      min-height: 10rem;
      width: 100%;
    }

    span {
      display: block;
      height: 1.5rem;
      text-align: center;
      font-size: 14px;
    }
  }

}
</style>