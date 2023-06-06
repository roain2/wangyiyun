<template>
  <header>
    <!-- LOGO -->
    <div class="logo">
      <img src="./img/logo.png" alt="" />
    </div>
    <!-- 页面前后跳转 -->
    <div class="pageSkip">
      <el-button :icon="ArrowLeft" circle @click="router.back()" />
      <el-button :icon="ArrowRight" circle @click="router.forward()" />
    </div>
    <!-- 搜索模块 -->
    <div class="search">
      <el-popover placement="bottom" :width="320" trigger="click">
        <template #reference>
          <!-- 搜索框 -->
          <el-input class="search-input" placeholder="请输入内容" :prefix-icon="Search" v-model.trim="keywords"
            @keyup.enter.native="toSearch"></el-input>
        </template>
        <!-- 热搜列表 -->
        <div class="hotsearch">
          <div class="title">热搜榜</div>
          <div class="item" v-for="(item, index) in hotSearch" @click="goHotSearch(item.searchWord)">
            <div class="index">{{ index + 1 }}</div>
            <div class="searchWord">{{ item.searchWord }}</div>
          </div>
        </div>
      </el-popover>
    </div>
    <!-- 登录 -->
    <div class="toLogin">
      <!-- 未登录时展示 -->
      <div v-if="!cookie">
        <img @click="loginDialogIsVisible = true" src="./img/login.jpg" alt="" />
        <span>点击头像登录</span>
      </div>
      <div v-if="cookie" class="userInfo" @click="toUserDetails">
        <!-- 用户头像 -->
        <img :src="accountInfo.avatarUrl" alt="" />
        <!-- 用户名称 -->
        <span>{{ accountInfo.nickname }}</span>
      </div>
      <!-- 登录页面 -->
      <el-dialog v-model="loginDialogIsVisible" width="30%" :modal="false" :center="true" :draggable="true" top="10vh">
        <Login :closeDialog="closeDialog"></Login>
      </el-dialog>
    </div>
    <!-- 退出登录 -->
    <div class="quit" v-if="cookie">
      <el-button :icon="SwitchButton" circle size="large" @click="quitDialogIsVisible = true" />
    </div>
    <el-dialog v-model="quitDialogIsVisible" title="退出登录" width="30%" :center="true" :modal="false" :draggable="true">
      <span class="quitHint">请问是否确认退出登录</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="toLogout">确定</el-button>
          <el-button @click="quitDialogIsVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </header>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, Search, SwitchButton } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import Login from '../Login/index.vue'
import { getAccountInfoApi, logoutApi } from '@/api/login'
import { hotSearchApi } from '@/api/search'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user'
const router = useRouter()
const userStore = useUserStore()

/**
 * 搜索
 */
let keywords = ref('')

function toSearch() {
  // 将当前搜索框中的关键字保存在 session 中
  // TODO 做建议搜索
  sessionStorage.setItem('keywords', keywords.value)
  // 判断，如果当关键字不为空串时才能进行搜索，否则进行提示
  if (keywords.value) {
    // 跳转页面，并传递搜索的关键词
    router.push({
      name: 'searchSongs',
      params: {
        keywords: keywords.value,
      },
    })
  } else {
    ElMessage.warning('请输入有效的搜索关键字 ！')
  }
}

let hotSearch = ref()
// 热搜榜单
async function getHotSearch() {
  const res: any = await hotSearchApi()
  hotSearch.value = res.data
}
// 跳转热搜
function goHotSearch(searchWord: string) {
  router.push({
    name: 'searchSongs',
    params: {
      keywords: searchWord,
    },
  })
}

/**
 * 登录
*/
let loginDialogIsVisible = ref(false)
let quitDialogIsVisible = ref(false)

function closeDialog() {
  loginDialogIsVisible.value = false
}
// 退出登录
async function toLogout() {
  const res: any = await logoutApi()
  console.log(res)
  if (res.code === 200) {
    ElMessage.success('已退出登录')
    // 清空cookie token
    localStorage.removeItem('cookie')
    localStorage.removeItem('token')
    // 关闭弹窗
    quitDialogIsVisible.value = false
  }
  // 刷新页面
  router.go(0)
}

// 账户信息
let accountInfo = ref({ avatarUrl: '', nickname: '' })

let cookie = computed(() => {
  return localStorage.getItem('cookie')
})

async function getAccountInfo() {
  // 没有cookie就不获取
  if (!localStorage.getItem('cookie')) {
    return
  }
  const res: any = await getAccountInfoApi()
  if (res.profile === null) {
    await logoutApi()
    localStorage.removeItem('cookie')
    localStorage.removeItem('token')
    ElMessage.warning('登录异常,已退出登录！')
    return
  }
  accountInfo.value = res.profile
  userStore.uid = res.profile.userId
  userStore.getUserData()
}

function toUserDetails() {
  router.push({
    name: 'myMusic',
  })
}

getHotSearch()
getAccountInfo()
</script>

<style lang="less" scoped>
header {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #ec4141;
  align-items: center;
  position: relative;

  .logo {
    margin: 0 25px;

    img {
      height: 50px;
      //图片对其方式，容易影响布局
      vertical-align: middle;
    }
  }

  .pageSkip {
    margin: 20px;

    .el-button {
      background-color: #e13e3e;
      border: none;
      color: white;
    }
  }

  .search {
    margin: 20px;

    // 深度选择器，影响子组件
    :deep(.search-input) {
      .el-input__wrapper {
        border-radius: 20%;
        background-color: #e13e3e;
        box-shadow: none;

        input {
          color: white;

          &::-webkit-input-placeholder {
            color: rgba(255, 255, 255);
          }
        }

        .el-input__prefix {
          color: white;
        }
      }
    }
  }

  .toLogin {
    position: absolute;
    right: 100px;

    div {
      img {
        width: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 5px;
        cursor: pointer;
      }

      span {
        color: white;
        font-family: '等线';
        font-size: 15px;
      }
    }

    .userInfo {
      cursor: pointer;
    }
  }

  .quit {
    position: absolute;
    right: 40px;

    .el-button {
      background-color: #e13e3e;
      color: white;
      border: 0;
    }
  }

  .quitHint {
    font-size: 16px;
    text-align: center;
  }
}

// 热搜榜
.hotsearch {
  height: 20rem;
  overflow-y: scroll;

  .title {
    cursor: default;
    margin-left: 1rem;
    margin-bottom: 1rem;
    font-size: 16px;
    font-weight: 600;
  }

  .item {
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 1rem;
    padding-right: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 1rem;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>