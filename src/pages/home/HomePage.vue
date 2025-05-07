<template>
  <view class="flex flex-col items-center justify-center">
    <image class="w-[200rpx] h-[200rpx] mt-[200rpx] mx-auto mb-[50rpx]" src="/static/logo.png" />
    <view class="flex justify-center border border-solid border-red-500 px-2">
      <text class="text-[36rpx] text-red-500">{{ title }}</text>
    </view>
    <view class="mt-8 p-4 bg-blue-500 rounded-lg">
      <text class="text-white font-bold">Tailwind CSS 已成功集成!</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const title = ref('首页')
</script>

<style>

</style>
