<template>
  <!-- 视频详情页 -->
  <div class="videoDetails" v-loading="isLoading">
    <!-- 主体内容 -->
    <div class="videoContent">
      <div class="tag">视频详情</div>
      <!-- 视频 -->
      <video :src="videoUrl" controls :poster="videoDetails.cover"></video>
      <!-- 作者 -->
      <div class="author">
        <div class="item" v-for="ar in videoDetails.artists" :key="ar.id" @click="toSingerDetails(ar.id)">
          <div class="img">
            <img :src="ar.img1v1Url" alt="" />
          </div>
          <div class="name">{{ ar.name }}</div>
        </div>
      </div>
      <!-- 标题 -->
      <div class="title">{{videoDetails.name}}</div>
      <!-- 发布日期 -->
      <span class="publishTime">发布：{{ videoDetails.publishTime }}</span>
      <!-- 播放量 -->
      <span class="count">播放：{{ (videoDetails.playCount / 10000).toFixed(1) }}万</span>
      <!-- 操作 -->
      <div class="operate">
        <!-- 赞 -->
        <div class="like">
          <i class="iconfont">&#xe608;</i>赞
        </div>
        <!-- 收藏 -->
        <div class="collect">
          <i class="iconfont">&#xe60c;</i>收藏
        </div>
        <!-- 分享 -->
        <div class="share">
          <i class="iconfont">&#xe624;</i>分享
        </div>
      </div>
      <!-- MV评论 -->
      <CComments :type="'mv'" :id="id" />
    </div>
    <!-- 相关推荐 -->
    <div class="releted">
      <!-- 标题 -->
      <div class="tag">相关推荐</div>
      <div class="item" v-for="releted in reletedMV" :key="releted.id" @click="toVideoDetails(releted.id)">
        <div class="count">
          <i class="iconfont">&#xe606;</i>
          <span>{{(releted.playCount/10000).toFixed(1)}}万</span>
        </div>
        <el-image :src="releted.cover">
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
        <div class="name">
          <span>{{releted.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { mvDetailsApi, mvUrlApi, reletedMvApi } from '@/api/video'
import CComments from '@/components/common/CComments.vue'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id)

let isLoading = ref(true)

// 视频详细信息
let videoDetails = ref<any>({
  name: '',
  cover: ''
})
// 视频URL
let videoUrl = ref()
// 相关推荐mv
let reletedMV = ref()

async function getData() {
  isLoading.value = true
  // 获取视频详情
  const details: any = await mvDetailsApi(id.value)
  videoDetails.value = details.data
  // 获取视频URL
  const urlRes: any = await mvUrlApi(id.value)
  videoUrl.value = urlRes.data.url
  // 获取相关MV推荐
  const reletedRes: any = await reletedMvApi(id.value)
  reletedMV.value = reletedRes.mvs
  isLoading.value = false
}

function toSingerDetails(id: number) {
  router.push({
    name: 'singerDetails',
    params: {
      id,
    },
  })
}
function toVideoDetails(id: number) {
  router.push({
    name: 'videoDetails',
    params: { id }
  })
}
getData()
</script>

<style lang="less">
.videoDetails {
  display: flex;
  width: 100%;

  .tag {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0.7rem;
  }

  .videoContent {
    width: 68%;
    padding-right: 1.5rem;
    border-right: 2px solid #ccc;

    video {
      width: 100%;
      margin-bottom: 1rem;
    }

    .author {
      display: flex;
      width: 100%;
      margin-bottom: 1rem;

      .item {
        display: flex;
        align-items: center;
        margin: 0 0.5rem;
        cursor: pointer;

        .img img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }

        .name {
          margin-left: 0.5rem;
          color: #666;
          font-size: 14px;
        }
      }
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 0.7rem;
    }

    .publishTime,
    .count {
      margin-right: 3rem;
      font-size: 14px;
      color: #999;
    }

    .operate {
      display: flex;
      margin-top: 1rem;

      div {
        border: 1px solid #ddd;
        padding: 0.3rem 1rem;
        border-radius: 50px;
        font-size: 14px;
        margin-right: 1rem;
        cursor: pointer;

        i {
          margin-right: 0.2rem;
        }

        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }

  .releted {
    padding-left: 1.5rem;
    padding-right: 1rem;
    width: 32%;

    .item {
      cursor: pointer;
      position: relative;
      margin-bottom: 0.5rem;

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
}
</style>