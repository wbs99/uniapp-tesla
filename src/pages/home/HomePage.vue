<template>
  <view>
    <CustomNavbar title="标题" :is-fixed="true" />
    <view :style="{ paddingTop: `${navBarHeight}px` }">
      <scroll-view
        :style="{ height: `calc(100vh - ${navBarHeight}px)` }"
        scroll-y
        :refresher-enabled="true"
        :refresher-triggered="isRefreshing"
        @scrolltolower="loadMore"
        @refresherrefresh="onRefresh"
      >
        <!-- 功能模块区域 -->
        <view class="p-3 mb-3">
          <view
            v-for="feature in features"
            :key="feature.id"
            class="h-20 mb-3 rounded-xl overflow-hidden last:mb-0 bg-[#f8f9fa]"
            @tap="handleFeatureClick(feature)"
          >
            <view class="h-full flex items-center px-4">
              <image class="w-10 h-10 mr-4 rounded" :src="feature.imageUrl" mode="aspectFit" />
              <text class="text-base font-bold text-[#333]">
                {{ feature.title }}
              </text>
              <text class="text-xs text-[#666]">
                {{ feature.description }}
              </text>
            </view>
          </view>
        </view>

        <!-- 列表区域 -->
        <view class="bg-white">
          <view
            v-for="item in listData"
            :key="item.id"
            class="flex p-4 border-b border-solid border-[#eee]"
          >
            <image class="w-15 h-15 rounded-lg mr-3" :src="item.imageUrl" mode="aspectFill" />
            <view class="flex flex-col flex-1">
              <text class="mb-3 text-base font-bold text-[#333]">
                {{ item.title }}
              </text>
              <text class="grow-1 mb-2 text-sm text-[#666]">
                {{ item.description }}
              </text>
              <view class="flex items-center justify-between">
                <text class="text-xs text-[#999]">
                  {{ item.time }}
                </text>
                <text class="text-xs text-[#007aff]">
                  {{ item.author }}
                </text>
              </view>
            </view>
          </view>

          <!-- 加载更多提示 -->
          <view v-if="loading" class="p-5 text-center text-sm text-[#999]">
            <text>加载中...</text>
          </view>
          <view v-if="!hasMore && listData.length > 0" class="p-5 text-center text-sm text-[#999]">
            <text>没有更多了</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useNavbarInfo } from '@/hooks/useNavbarInfo'
import CustomNavbar from '../CustomNavbar.vue'

const { navBarHeight } = useNavbarInfo()

type LoadDataOptions = {
  isRefresh?: boolean
}

onMounted(() => {
  loadData()
})

const features = ref([
  {
    id: 1,
    title: '功能模块1',
    description: '这是第一个功能模块的描述',
    imageUrl: 'https://iph.href.lu/40x40?text=Hello&bg=333&fg=fff'
  },
  {
    id: 2,
    title: '功能模块2',
    description: '这是第二个功能模块的描述',
    imageUrl: 'https://iph.href.lu/40x40?text=Hello&bg=333&fg=fff'
  },
  {
    id: 3,
    title: '功能模块3',
    description: '这是第三个功能模块的描述',
    imageUrl: 'https://iph.href.lu/40x40?text=Hello&bg=333&fg=fff'
  },
  {
    id: 4,
    title: '功能模块4',
    description: '这是第四个功能模块的描述',
    imageUrl: 'https://iph.href.lu/40x40?text=Hello&bg=333&fg=fff'
  }
])

// 列表数据
const listData = ref<any[]>([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)
const isRefreshing = ref(false)

const generateMockData = (pageNum: number, count: number = 10) => {
  const data = []
  const startIndex = (pageNum - 1) * count
  for (let i = 0; i < count; i++) {
    const index = startIndex + i
    data.push({
      id: `item_${index}`,
      title: `列表项 ${index + 1}`,
      description: `这是第 ${index + 1} 个列表项的详细描述内容，用于展示无限滚动效果。`,
      imageUrl: 'https://iph.href.lu/40x40?text=Hello&bg=333&fg=fff',
      time: new Date(Date.now() - index * 3600000).toLocaleString('zh-CN'),
      author: `用户${index % 5 + 1}`
    })
  }

  return data
}

const mockRequest = () => {
  return new Promise<any[]>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('模拟网络错误'))
      } else {
        resolve(generateMockData(page.value))
      }
    }, 300)
  })
}

const onLoadError = (error: any) => {
  console.error('加载数据失败:', error)
  uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
}

const loadData = async (options: LoadDataOptions = {}) => {
  const { isRefresh = false } = options

  if (loading.value) {
    return
  }

  loading.value = true

  const newData = await mockRequest().catch(onLoadError)
  if (!newData) {
    loading.value = false
    return
  }

  if (isRefresh) {
    listData.value = newData
    isRefreshing.value = false
  } else {
    listData.value.push(...newData)
  }

  if (page.value >= 5) {
    hasMore.value = false
  }

  loading.value = false
}

const loadMore = () => {
  if (!hasMore.value || loading.value) {
    return
  }
  page.value++
  loadData()
}

const onRefresh = () => {
  isRefreshing.value = true
  page.value = 1
  hasMore.value = true
  loadData({ isRefresh: true })
}

const handleFeatureClick = (feature: any) => {
  uni.showToast({
    title: `点击了${feature.title}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>

</style>
