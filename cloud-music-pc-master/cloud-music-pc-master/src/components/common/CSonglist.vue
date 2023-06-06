<template>
  <!-- 封装歌曲列表 -->
  <div class="songlist">
    <el-table :data="props.songlist" stripe style="width: 100%" @row-dblclick="playSong" :row-class-name="addIndex">
      <el-table-column type="index" width="50" />
      <el-table-column width="80">
        <el-icon :size="18">
          <Download />
        </el-icon>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" min-width="140" />
      <el-table-column prop="ar[0].name" label="歌手" min-width="120">
        <template #default="scope">
          <span v-for="(author, index) in scope.row.ar" :key="author.id">
            <span class="clikable" @click="toSingerDetails(author.id)">
              {{author.name}}
            </span>
            <!-- 最后一个歌手后面不加分隔符 -->
            <span v-if="index != scope.row.ar.length-1">/</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" min-width="120">
        <template #default="scope">
          <span class="clikable" @click="toAlbumDetails(scope.row.al.id)">{{scope.row.al.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时长" min-width="60" align="center">
        <template #default="scope">
          <span>{{msToMinSeconed(scope.row.dt)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { msToMinSeconed } from '@/utils/time'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
const router = useRouter()
const store = usePlayerStore()
const props = defineProps(['songlist'])

// 为 element-Plus 表格的行属性中添加索引
function addIndex({ row, rowIndex }: { row: any, rowIndex: number }) {
  //把每一行的索引放进row
  row.index = rowIndex
}

// 播放音乐
async function playSong(row: any) {
  // 如果歌单已经变了，就改变歌单
  if (props.songlist != store.playlist) {
    store.playlist = props.songlist
  }
  // 如果之前有正在播放的歌曲，则先将其执行暂停操作再进行后续步骤
  store.isPlaying = false
  store.index = row.index
  store.updateCurSong()
}

// 跳转歌手详情
function toSingerDetails(id: number) {
  router.push({
    name: 'singerDetails',
    params: { id },
  })
}

// 跳转专辑详情
function toAlbumDetails(id: number) {
  router.push({
    name: 'albumDetails',
    params: { id },
  })
}
</script>

<style lang="less">
.songlist {
  cursor: pointer;

  .el-table {
    font-size: 13px;
  }

  .clikable {
    &:hover {
      color: #ec4141;
      border-bottom: 1px solid #ec4141;
    }
  }
}
</style>