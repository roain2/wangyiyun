<template>
  <div class="dailyStar">
    <div class="top">
      <!-- 日历 -->
      <div class="calender">
        <i class="iconfont">&#xe89e;</i>
        <!-- 今天日期 -->
        <div class="date">{{(new Date()).getDate()}}</div>
      </div>
      <div class="descrip">
        <p class="title">每日推荐</p>
        <p class="subtitle">根据你的音乐口味生成，每天6:00刷新</p>
      </div>
    </div>
    <el-tabs v-model="selectedTag" class="dailyStarContent" v-loading="isLoading">
      <el-tab-pane label="歌曲" name="dailySongs">
        <CSonglist :songlist="dailySongs" />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="dailyPlaylist">
        <CPlaylist :playlists="dailyPlaylist" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { dailyStarPlaylistApi, dailyStarSongsApi } from "@/api/discovery"
import CSonglist from "../../components/common/CSonglist.vue"
import { usePlayerStore } from '@/stores/player'
import CPlaylist from '../../components/common/CPlaylist.vue'
const store = usePlayerStore()

let isLoading = ref(true)

let selectedTag = ref('dailySongs')

let dailySongs = ref()
let dailyPlaylist = ref()

// 获取每日推荐数据
async function getDailyData() {
  isLoading.value = true
  const songs = await dailyStarSongsApi()
  dailySongs.value = songs.data.dailySongs
  const playlist: any = await dailyStarPlaylistApi()
  dailyPlaylist.value = playlist.recommend
  isLoading.value = false
}

getDailyData()
</script>

<style lang="less" scoped>
.dailyStar {
  width: 100%;

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .calender {
      position: relative;
      color: rgb(238, 82, 82);
      padding: 0 1rem;

      i {
        font-size: 5rem;
      }

      .date {
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;
        font-weight: 600;
      }
    }

    .descrip {
      .title {
        font-size: 20px;
        font-weight: 600;
      }

      .subtitle {
        color: #666;
      }
    }
  }
}
</style>