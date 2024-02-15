<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  //图标名
  name: String,
  // 颜色
  color: {
    type: String,
    default: ''
  },
  //宽度
  width: {
    type: String,
    default: '16px',
  },
  //高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped>

</style>