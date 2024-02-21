<script setup lang="ts">
import {FullScreen, Refresh, Setting} from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting.ts";
import useUserStore from "@/store/modules/user.ts";
import {useRoute, useRouter} from "vue-router";

let $router = useRouter();
let $route = useRoute();

let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();

//刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

//全屏点击回调
const fullScreen = () => {
  //DOM对象的一个属性，判断当前是否是全屏，true和false
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//退出登录回调
const logout = async () => {
  //发请求退出登录接口******
  //清空相关数据
  //跳转到登陆页面
  await userStore.userLogout();
  //跳转登录页面
  await $router.push({path: '/login', query: {redirect: $route.path}})
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<template>
  <div class="header_right">
    <el-button size="small" :icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" :icon="Setting" circle></el-button>
    <img
        :src="userStore.avatar"
        alt=""
        style="width: 24px; height: 24px; margin: 0 10px;border-radius: 50%"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down/>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.header_right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
</style>
