<template>
  <div class="rank" v-loading="loading">
    <!-- 官方榜 -->
    <div class="official">
      <div class="title">官 方 榜</div>
      <div class="content">
        <div class="item" v-for="item in officialToplist" :key="item.id" @click="toPlaylistDetails(item.id)">
          <!-- 图片 -->
          <el-image :src="item.coverImgUrl" alt="" />
          <!-- 展示前三首歌 -->
          <div class="songs">
            <div class="song" v-for="(song,index) in item.tracks" :key="song.first">
              <span class="index">{{index+1}}</span>
              <!-- 歌名 -->
              <span class="name">{{song.first}}</span>
              <!-- 歌手 -->
              <span class="author">{{song.second.slice(0,10)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 全球榜 -->
    <div class="global">
      <div class="title">全 球 榜</div>
      <div class="content">
        <div class="item" v-for="item in globalToplist" :key="item.id" @click="toPlaylistDetails(item.id)">
          <el-image :src="item.coverImgUrl" alt="">
            <template #placeholder>
              <div class="image-slot">加载中<span class="dot">...</span></div>
            </template>
          </el-image>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { toplistApi } from '@/api/discovery'

const router = useRouter()

let loading = ref(true)
let officialToplist = ref()
let globalToplist = ref()

async function getToplist() {
  loading.value = true
  const res: any = await toplistApi()
  // 前4个是官方榜,后面是全球榜
  officialToplist.value = res.list.slice(0, 4)
  globalToplist.value = res.list.slice(4)
  loading.value = false
}

function toPlaylistDetails(id: number) {
  console.log(id)
  router.push({
    name: 'playlistDetails',
    params: {
      id,
    },
  })
}

getToplist()
</script>

<style lang="less" scoped>
.rank {
  .title {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    line-height: 22px;
    font-size: 22px;
    font-weight: bold;
    cursor: default;
  }

  .official {
    margin-bottom: 1rem;

    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .item {
        height: 150px;
        border: 1px solid #eee;
        border-radius: 1rem;
        margin: 1rem;
        display: flex;
        cursor: pointer;

        .el-image {
          height: 100%;
          border-radius: 1rem;
        }

        .songs {
          height: 100%;
          width: 65%;
          margin-left: 0.5rem;

          .song {
            height: 33.3%;
            width: 100%;

            .name:hover {
              color: #ec4141;
              border-bottom: 1px solid #ec4141;
            }

            span {
              line-height: 3rem;
              margin-left: 0.5rem;
              font-size: 14px;
            }

            .index,
            .author {
              font-size: 11px;
              color: #444;
            }

            .author {
              float: right;
              margin-right: 0.5rem;
            }
          }
        }
      }
    }
  }

  .global {
    .content {
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      .item {
        text-align: center;
        margin: 1rem;
        cursor: pointer;

        .el-image {
          border-radius: 1rem;
        }

        span {
          font-size: 13px;

          &:hover {
            color: #ec4141;
            border-bottom: 1px solid #ec4141;
          }
        }
      }
    }
  }
}
</style>