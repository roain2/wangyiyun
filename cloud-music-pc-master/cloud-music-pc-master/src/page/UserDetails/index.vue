<template>
  <!-- 用户详情页 -->
  <div class="userDetails">
    <!-- 用户信息 -->
    <div class="userInfo" v-loading="isLoading">
      <div class="img">
        <img :src="userInfo.avatarUrl" alt="" />
      </div>
      <div class="text">
        <!-- 基本信息 -->
        <div class="basic">
          <div class="nickname">{{userInfo.nickname}}</div>
          <div class="level">Lv.{{userInfo.level}}</div>
        </div>
        <el-divider />
        <!-- 用户数据 -->
        <div class="userData">
          <div class="message">
            <div class="count">{{ userInfo.eventCount }}</div>
            <div class="tag">动态</div>
          </div>
          <div class="attention" @click="toFollows">
            <div class="count">{{ userInfo.follows }}</div>
            <div class="tag">关注</div>
          </div>
          <div class="fans" @click="toFolloweds">
            <div class="count">{{ userInfo.followeds }}</div>
            <div class="tag">粉丝</div>
          </div>
        </div>
        <!-- 用户 id -->
        <div class="uid">
          用户ID：<span>{{ userInfo.userId }}</span>
        </div>
        <!-- 用户个人介绍 -->
        <div class="description">
          个人介绍：<span>{{ userInfo.signature }} </span>
          <span v-if="!userInfo.signature">暂无个人介绍</span>
        </div>
      </div>
    </div>
    <!-- 创建的歌单 -->
    <div class="createPlaylist" v-if="createdPlaylist.length">
      <div class="title">
        {{userInfo.nickname}}创建的歌单({{createdPlaylist.length}})
      </div>
      <CPlaylist :playlists="createdPlaylist" />
    </div>
    <!-- 收藏的歌单 -->
    <div class="subscribedPlaylist" v-if="subscribedPlaylist.length">
      <div class="title">
        {{userInfo.nickname}}收藏的歌单({{subscribedPlaylist.length}})
      </div>
      <CPlaylist :playlists="subscribedPlaylist" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { userDetailsApi, userPlaylistApi } from '@/api/user'
import CPlaylist from '@/components/common/CPlaylist.vue'
const route = useRoute()
const router = useRouter()

const id = computed(() => {
  return route.params.id
})

let isLoading = ref(true)

// 用户信息
let userInfo = ref<any>({
  avatarUrl: ''
})
// 用户创建的歌单
let createdPlaylist = ref(<any>[])
// 用户收藏/订阅(subscrib)的歌单
let subscribedPlaylist = ref(<any>[])

async function getUserDetails() {
  isLoading.value = true
  // 获取信息
  const info: any = await userDetailsApi(id.value)
  userInfo.value = info.profile
  userInfo.value.level = info.level
  // 获取歌单
  const res: any = await userPlaylistApi(id.value)
  res.playlist.forEach((item: any) => {
    // 方便使用CPlaylist组件
    item.picUrl = item.coverImgUrl
    // 不是订阅就是创建，只有这两种类型的歌单
    if (!item.subscribed) {
      createdPlaylist.value.push(item)
    } else {
      subscribedPlaylist.value.push(item)
    }
  })
  isLoading.value = false
}

function toFollows() {
  router.push({
    name: 'follows',
    params: {
      id: id.value
    }
  })
}
function toFolloweds() {
  router.push({
    name: 'followeds',
    params: {
      id: id.value
    }
  })
}

getUserDetails()
</script>

<style lang="less">
.userDetails {
  .userInfo {
    display: flex;
    padding: 0 1rem;
    width: 100%;
    margin-bottom: 2rem;

    .img img {
      height: 12rem;
      width: 12rem;
      border-radius: 50%;
    }

    .text {
      margin-left: 2rem;
      width: 100%;

      .basic {
        display: flex;
        align-items: center;
        padding-left: 1rem;

        .nickname {
          font-size: 24px;
          font-weight: 600;
          margin-right: 1rem;
        }

        .level {
          font-size: 13px;
          width: 2.2rem;
          height: 1.2rem;
          line-height: 1.2rem;
          border-radius: 10px;
          text-align: center;
          background-color: #ccc;
        }
      }

      .userData {
        display: flex;
        margin-bottom: 1rem;

        &>div {
          border-right: 1px solid #ddd;
          text-align: center;
          padding: 0 2rem;
          cursor: pointer;

          .count {
            font-size: 18px;
          }

          .tag {
            font-size: 12px;
            color: #444;
          }
        }
      }

      .uid,
      .description {
        padding-left: 0.5rem;
        font-size: 13px;
        margin-bottom: 0.5rem;

        span {
          color: #444;
        }
      }
    }
  }

  .createPlaylist,
  .subscribedPlaylist {
    margin-bottom: 1rem;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-left: 0.5rem;
      padding: 0.5rem;
    }
  }
}
</style>