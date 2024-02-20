<script setup lang="ts">
//引入设置标题与logo图片
import setting from "@/setting.ts";
</script>

<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-show="setting.logoHidden" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
