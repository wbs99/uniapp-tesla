<template>
  <view>
    <CustomNavbar
      title="标题"
      :show-back="true"
    />

    <view :style="{ paddingTop: `${navBarHeight}px` }">
      这里是页面内容
    </view>
  </view>
</template>

<script setup lang="ts">
import { useNavbarInfo } from '@/hooks/useSystemInfo'
import CustomNavbar from '../CustomNavbar.vue'

const { navBarHeight } = useNavbarInfo()
</script>
