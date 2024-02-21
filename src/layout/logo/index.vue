<script setup lang="ts">
//引入设置标题与logo图片
import setting from "@/setting.ts";
import useLayoutSettingStore from "@/store/modules/setting.ts";
let LayoutSettingStore = useLayoutSettingStore();
</script>

<script lang="ts">
export default {
  name: "Logo",
};
</script>

<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-show="setting.logoHidden" />
    <p v-show="!LayoutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: black;
  display: flex;
  align-items: center;
  padding: 12px;
  img {
    width: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
