<template>
  <div class="songlist">
    <!-- 歌单分类 -->
    <div class="category">
      <!-- 所有类型选择菜单（可下拉选择） -->
      <el-popover placement="bottom-start" :width="500" trigger="hover">
        <template #reference>
          <el-button class="currentSelect">
            <span>{{ currentSelectedName }}</span>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </el-button>
        </template>
        <el-button v-for="(tag, index) in playlistTag" :key="index" @click="changeCategory(index)"
          style="margin: 0.2rem;" color='#ed5736' plain>
          <span>{{ tag.name }}</span>
        </el-button>
      </el-popover>
      <!-- 热门标签 -->
      <div class="hotCategory">
        <el-button color="#ed5736" plain v-for="(h, index) in hotTag" :key="index" @click="changeHotCategory(index)">
          <span>{{h.name}}</span>
        </el-button>
      </div>
    </div>
    <div class="container" v-loading="loading">
      <!-- 歌单列表 -->
      <Playlist :playlists="playlists" :type="'playlist'"/>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background v-model:currentPage="pageInfo.currentPage" layout="prev, pager, next"
          :total="pageInfo.total" :page-size="pageInfo.pageSize" @current-change="getHandpick" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import { playlistTagApi, hotTagApi, handpickApi } from '@/api/discovery'
import Playlist from '../../components/common/CPlaylist.vue'

let loading = ref(true)
// 歌单标签
let playlistTag = ref()
// 热门歌单标签
let hotTag = ref()
// 当前选中的标签Name
let currentSelectedName = ref('华语')

async function getPlaylistTag() {
  const res: any = await playlistTagApi()
  playlistTag.value = res.sub
}
async function getHotTag() {
  const res: any = await hotTagApi()
  hotTag.value = res.tags
}

// 切换标签
function changeCategory(index: number) {
  currentSelectedName.value = playlistTag.value[index].name
  getHandpick()
}
function changeHotCategory(index: number) {
  currentSelectedName.value = hotTag.value[index].name
  getHandpick()
}


// 根据分类和分页获取歌单信息
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 25, //设置为默认25页,且不可修改
  total: 0,
})
// 歌单列表
let playlists = ref()

// 获取歌单
async function getHandpick() {
  loading.value = true
  const res: any = await handpickApi(currentSelectedName.value, pageInfo.currentPage - 1)
  pageInfo.total = res.total - pageInfo.pageSize
  res.playlists.forEach((item: any) => {
    item.picUrl = item.coverImgUrl
  })
  playlists.value = res.playlists
  loading.value = false
}

getPlaylistTag()
getHotTag()
getHandpick()
</script>

<style lang="less" scoped>
.songlist {
  .category {
    display: flex;
    height: 2rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    margin-bottom: 1rem;

    .currentSelect {
      height: 2rem;
      border-radius: 1rem;
      border: 1px solid #ddd;
      color: black;
      font-weight: 600;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;

    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #f0230c; //修改后的背景图颜色
      color: #fff;
    }
  }
}
</style>