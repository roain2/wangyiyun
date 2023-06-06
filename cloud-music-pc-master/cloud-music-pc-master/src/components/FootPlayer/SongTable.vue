<template>
  <!-- 播放列表 -->
  <div class="songTable">
    <div class="amount">总{{ store.playlist.length || 0 }}首</div>
    <el-table :data="store.playlist" stripe :row-class-name="addIndex" @row-dblclick="playSong" empty-text="暂无歌曲">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="音乐标题">
        <template #default="scope">
          <span>{{scope.row.name.slice(0,10)}}</span>
          <!-- 超过长度10用...代替 -->
          <span v-if="scope.row.name.length > 10">...</span>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手">
        <template #default="scope">
          <span>{{scope.row.ar[0].name.slice(0,8)}}</span>
          <!-- 有多个作者或者第一个作者名字超过8长度 用...代替 -->
          <span v-if="scope.row.ar[1] || scope.row.ar[0].length > 8">...</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
const store = usePlayerStore()

// 为 element-Plus 表格的行属性中添加索引
function addIndex({ row, rowIndex }: { row: any, rowIndex: number }) {
  //把每一行的索引放进row
  row.index = rowIndex
  // 添加样式
  if (rowIndex == store.index) {
    return 'active'
  }
}
function playSong(row: any) {
  store.isPlaying = false
  store.index = row.index
  store.updateCurSong()
}

</script>

<style lang="less">
.songTable {
  .amount {
    font-size: 13px;
    color: #aaa;
    padding: 1rem;
  }

  .el-table {
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .active {
    color: #ec4141;
  }
}
</style>