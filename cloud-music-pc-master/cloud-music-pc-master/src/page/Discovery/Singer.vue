<template>
  <div class="singer">
    <!-- 歌手分类 -->
    <div class="category">
      <!-- 地区 -->
      <div class="area">
        <p class="title">地区:</p>
        <div class="opts">
          <div :class="{ opt: true, selected: area.key === condition.areaKey }" v-for="(area, i) in category.area"
            :key="i" @click="switchOpt(area.key, 'area')">
            <span>{{area.name}}</span>
          </div>
        </div>
      </div>
      <!-- 类别 -->
      <div class="type">
        <p class="title">分类:</p>
        <div class="opts">
          <div :class="{ opt: true, selected: type.key === condition.typeKey }" v-for="(type, i) in category.type"
            :key="i" @click="switchOpt(type.key, 'type')">
            <span>{{type.name}}</span>
          </div>
        </div>
      </div>
      <!-- 首字母 -->
      <div class="initial">
        <p class="title">分类:</p>
        <div class="opts">
          <div :class="{ opt: true, selected: initial.key === condition.initialKey }" id="initial"
            v-for="(initial, i) in category.initial" :key="i" @click="switchOpt(initial.key, 'initial')">
            <span>{{initial.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌手列表 -->
    <CSingerList :singerlist="singerlist" v-loading="isLoading" />
    <!-- 是否继续加载 -->
    <div class="continueLoading">
      <el-button color='#ed5736' plain @click="continueLoading">点击查看更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { staticSingerCategory } from '@/hooks/useStaticData'
import { singerlistApi } from '@/api/discovery'
import { ElMessage } from 'element-plus'
import CSingerList from '@/components/common/CSingerList.vue'
const router = useRouter()
const category = staticSingerCategory

let isLoading = ref(true)
// 关于分类获取歌手的条件
const condition = reactive({
  areaKey: -1,
  typeKey: -1,
  initialKey: '-1',
  // 当前加载数据的次数（配合实现懒加载）
  count: 1,
  // 每次加载25个
  limit: 25,
  // 是否还有更多数据
  isMore: false,
})
// 歌手列表信息
let singerlist = ref<any>([])

async function getSingerlist() {
  isLoading.value = true
  const res: any = await singerlistApi(
    condition.areaKey, condition.typeKey, condition.initialKey,
    (condition.count - 1) * condition.limit, condition.limit
  )
  singerlist.value.push(...res.artists)
  condition.isMore = res.more
  isLoading.value = false
}

// 切换条件
function switchOpt(key: any, opt: string) {
  if (opt == 'area') {
    condition.areaKey = key
  } else if (opt == 'type') {
    condition.typeKey = key
  } else {
    condition.initialKey = key
  }
  // 清空
  singerlist.value = []
  condition.count = 1
  getSingerlist()
}

// 继续加载
function continueLoading() {
  if (condition.isMore) {
    condition.count++
    getSingerlist()
  } else {
    ElMessage.warning('暂无更多数据!')
  }
}

getSingerlist()
</script>

<style lang="less" scoped>
.singer {
  padding: 0 0.5rem;
  height: 100%;

  .category {
    height: 10rem;

    .title {
      width: 3rem;
      font-size: 16px;
      font-weight: 600;
      line-height: 2.25rem;
    }

    .area,
    .type,
    .initial {
      display: flex;


      .opts {
        display: flex;
        font-size: 14px;
        color: #444;
        height: 3rem;
        width: 100%;
        flex-wrap: wrap;

        .opt {
          width: 4rem;
          height: 2rem;
          padding: 0.5rem;
          margin: 0 0.5rem;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    #initial {
      width: 3rem;
    }

    .selected {
      color: #ec4141;
      background-color: #fdf5f5;
    }
  }

  .continueLoading {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }

}
</style>