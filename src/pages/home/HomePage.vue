<template>
  <view>
    <CustomNavbar title="标题" :is-fixed="true" />
    <view :style="{ paddingTop: `${navBarHeight}px` }">
      <view v-for="item in 100" :key="item" class="w-10 h-10 flex items-center justify-center border border-solid border-red-green">
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useNavbarInfo } from '@/hooks/useNavbarInfo'
import CustomNavbar from '../CustomNavbar.vue'

const { navBarHeight } = useNavbarInfo()
</script>

<style lang='scss' scoped>

</style>
