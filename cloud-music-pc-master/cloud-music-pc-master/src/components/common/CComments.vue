<template>
  <!-- 封装评论组件 -->
  <div class="Comments">
    <!-- 发布评论 -->
    <div class="releaseComment">
      <el-input v-model="commentContent" type="textarea" placeholder="评论千万条，友善第一条" />
      <el-button type="danger" plain @click="toRelease">评论</el-button>
      <div class="total">{{commentContent.length}}/128</div>
    </div>
    <!-- 热门评论 -->
    <div class="hot">
      <div class="title" v-if="hotComments.length">最热评论</div>
      <div class="item" v-for="comment in hotComments" :key="comment.commentId">
        <!-- 评论人 -->
        <div class="commenter">
          <div class="avatar">
            <img :src="comment.user.avatarUrl" alt="加载中...">
          </div>
          <div class="userInfo">
            <div class="nickname">{{comment.user.nickname}}</div>
            <div class="date">{{comment.timeStr}}</div>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="content">{{comment.content}}</div>
      </div>
    </div>
    <!-- 最新评论 -->
    <div class="latest">
      <div class="title" v-if="newComments.length">最新评论</div>
      <div class="title" v-else>暂无评论</div>
      <div class="item" v-for="comment in newComments" :key="comment.commentId">
        <!-- 评论人 -->
        <div class="commenter" @click="toUserDetails(comment.user.userId)">
          <div class="avatar">
            <img :src="comment.user.avatarUrl" alt="加载中...">
          </div>
          <div class="userInfo">
            <div class="nickname">{{comment.user.nickname}}</div>
            <div class="date">{{comment.timeStr}}</div>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="content">{{comment.content}}</div>
        <!-- 如果是自己写的可以删除 -->
        <div class="deletable" v-if="comment.user.userId==userStore.uid" @click="delComment(comment.commentId)">
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { songCommentApi, playlistCommentApi, albumCommentApi, mvCommentApi, releaseCommentApi, delCommentApi } from '@/api/comment'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const { type, id } = defineProps(['type', 'id'])

// type映射
// 0: 歌曲 1: mv 2: 歌单 3: 专辑
const typeKey = new Map([
  ['song', 0], ['mv', 1], ['playlist', 2], ['ablum', 3],
])

// 热门评论
let hotComments: any = ref([])
// 最新评论
let newComments: any = ref([])

// 根据类型获取评论
async function getComments() {
  let res: any = []
  if (type == 'song') {
    res = await songCommentApi(id)
  } else if (type == 'playlist') {
    res = await playlistCommentApi(id)
  } else if (type == 'album') {
    res = await albumCommentApi(id)
  } else if (type == 'mv') {
    res = await mvCommentApi(id)
  }
  hotComments.value = res.hotComments
  newComments.value = res.comments
}

// 评论内容
let commentContent = ref('')

function toUserDetails(id: number) {
  router.push({
    name: 'userDetails',
    params: { id }
  })
}

// 发表评论
async function toRelease() {
  if (!localStorage.getItem('cookie')) {
    ElMessage.warning('需要先登录才能评论')
    return
  }
  if (typeKey.get(type) == undefined) {
    ElMessage.warning('参数错误')
    return
  }
  if (commentContent.value.length <= 0) {
    ElMessage.warning('不能空评论')
    return
  }
  const res: any = await releaseCommentApi(typeKey.get(type) as number,
    id, commentContent.value)
  if (res.code == 200) {
    ElMessage.success('评论成功!(发布后有一定延迟)')
    getComments()
    commentContent.value = ''
  } else {
    ElMessage.error('评论失败')
  }
}

// 删除评论
async function delComment(commentId: number) {
  const res: any = await delCommentApi(typeKey.get(type) as number, id, commentId)
  if (res.code == 200) {
    ElMessage.success('删除成功!(删除后有一定延迟)')
    getComments()
  } else {
    ElMessage.error('删除失败')
  }
}

getComments()
</script>

<style lang="less" scoped>
.Comments {
  width: 100%;
  height: auto;
  margin-top: 1rem;

  .releaseComment {
    width: 100%;
    height: 5rem;

    .el-button {
      float: right;
      margin-top: 0.5rem;
    }

    .total {
      color: #666;
      font-size: 14px;
      padding-left: 0.1rem;
    }
  }

  .hot,
  .latest {
    width: 100%;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-top: 1rem;
    }

    .item {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      width: 100%;
      height: 4rem;
      border-bottom: 1px solid #ccc;
      position: relative;

      .commenter {
        display: flex;
        align-items: center;
        width: 10rem;
        cursor: pointer;
        z-index: 1;
        margin-right: 2rem;

        .avatar {
          height: 3rem;
          width: 3rem;
          margin: 0.5rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .nickname {
          width: 5rem;
          font-size: 14px;
        }

        .date {
          font-size: 13px;
          color: #666;
        }
      }

      .content {
        font-size: 12px;
        width: calc(100%-12rem);
      }

      .deletable {
        position: absolute;
        right: 0;
        font-size: 13px;
        cursor: pointer;
        padding: 0.5rem;

        &:hover {
          color: #e64545;
        }
      }
    }
  }
}
</style>