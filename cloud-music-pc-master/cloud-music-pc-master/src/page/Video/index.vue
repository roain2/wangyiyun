<template>
  <!-- MV主页 -->
  <div class="mv">
    <!-- MV分类 -->
    <div class="category">
      <div class="area">
        <p class="title">地区:</p>
        <div class="opts">
          <div :class="{ opt: true, selected: area.key === condition.area }" v-for="area in category.area"
            :key="area.key" @click="switchOpt(area.key, 'area')">
            <span>{{area.name}}</span>
          </div>
        </div>
      </div>
      <div class="type">
        <p class="title">类型:</p>
        <div class="opts">
          <div :class="{ opt: true, selected: type.key === condition.type }" v-for="type in category.type"
            :key="type.key" @click="switchOpt(type.key, 'type')">
            <span>{{type.name}}</span>
          </div>
        </div>
      </div>
      <div class="order">
        <p class="title">排序:</p>
        <div class="opts">
          <div :class="{ opt: true, selected: order.key === condition.order }" v-for="(order, i) in category.order"
            :key="i" @click="switchOpt(order.key, 'order')">
            <span>{{order.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- MV列表 -->
    <CVideoList :video-data="mvData" v-loading="isLoading" />
    <!-- 是否继续加载 -->
    <div class="continueLoading">
      <el-button color='#ed5736' plain @click="continueLoading">点击查看更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { staticMVCategory } from '@/hooks/useStaticData'
import { reactive, ref } from 'vue'
import { mvApi } from '@/api/video'
import { ElMessage } from 'element-plus';
import CVideoList from '../../components/common/CVideoList.vue';
// 分类数据
const category = staticMVCategory

let isLoading = ref(true)

// 查询条件
const condition = reactive({
  area: '全部',
  type: '全部',
  order: '全部',
  // 当前加载数据的次数（配合实现懒加载）
  count: 1,
  // 每次加载24个
  limit: 24,
  // 是否还有更多数据
  isMore: false,
})

// mv数据
let mvData = ref(<any>[])

// 获取分类mv数据
async function getMV() {
  isLoading.value = true
  const res: any = await mvApi(condition.area, condition.type, condition.order,
    (condition.count - 1) * condition.limit, condition.limit)
  mvData.value.push(...res.data)
  condition.isMore = res.hasMore
  isLoading.value = false
}

// 切换条件
function switchOpt(key: any, opt: string) {
  if (opt == 'area') {
    condition.area = key
  } else if (opt == 'type') {
    condition.type = key
  } else {
    condition.order = key
  }
  // 清空
  mvData.value = []
  condition.count = 1
  getMV()
}

// 继续加载
function continueLoading() {
  if (condition.isMore) {
    condition.count++
    getMV()
  } else {
    ElMessage.warning('暂无更多数据!')
  }
}

getMV()
</script>

<style lang="less">
.mv {
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
    .order {
      display: flex;


      .opts {
        display: flex;
        font-size: 14px;
        color: #444;
        height: 3rem;
        width: 100%;
        flex-wrap: wrap;

        .opt {
          width: 5rem;
          height: 2rem;
          padding: 0.5rem;
          margin: 0 0.5rem;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
        }
      }
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