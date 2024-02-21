<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting.ts";
import { nextTick, ref, watch } from "vue";

let layoutSettingStore = useLayoutSettingStore();

let flag = ref(true);

//监听仓库内部数据是否发生变化，说明用户点击过刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    //点击刷新按钮路由组件销毁
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>

<script lang="ts">
export default {
  name: "Main",
};
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--      渲染layout一级路由组件的子路由-->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
