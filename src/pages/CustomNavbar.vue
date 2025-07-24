<template>
  <!-- 外层：固定定位 + 背景色 -->
  <view
    class="fixed top-0 left-0 right-0 z-50 bg-purple-500"
    :class="[isFixed ? 'fixed' : 'relative']"
    :style="{ height: `${navBarHeight}px`, paddingTop: `${statusBarHeight}px` }"
  >
    <!-- 内容区：高度 = 导航栏 - 状态栏 -->
    <view
      class="relative flex items-center justify-center"
      :style="{ height: `${navBarHeight - statusBarHeight}px` }"
    >
      <!-- 返回按钮 -->
      <button
        v-if="showBack"
        class="absolute left-4 flex items-center justify-center w-8 h-8 text-white"
        @tap="goBack"
      >
        <span class="text-xl leading-none">←</span>
      </button>

      <!-- 标题 -->
      <h1 class="text-base font-semibold text-white">
        {{ title }}
      </h1>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useNavbarInfo } from '@/hooks/useSystemInfo'

interface Props {
  title?: string
  showBack?: boolean
  isFixed?: boolean
}
withDefaults(defineProps<Props>(), {
  title: '标题',
  showBack: false,
  isFixed: true
})

const { navBarHeight, statusBarHeight } = useNavbarInfo()

function goBack() {
  uni.navigateBack()
}
</script>
