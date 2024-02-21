<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Main from "@/layout/main/index.vue";
import Header from "@/layout/header/index.vue";
import {useRoute} from "vue-router";
import useUserStore from "@/store/modules/user.ts";
import useLayoutSettingStore from "@/store/modules/setting.ts";

let $route = useRoute();
//获取用户相关的小仓库


let userStore = useUserStore();
let LayoutSettingStore = useLayoutSettingStore();
</script>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<template>
  <div class="layout_container">
    <!--    左侧菜单-->
    <div class="layout_slider" >
      <Logo/>
      <el-scrollbar class="scrollbar">
        <el-menu
            :default-active="$route.path"
            :collapse="LayoutSettingStore.fold"

            active-text-color="#18784d"
            background-color="#f4f4f5"
            text-color="#646469"
        >
          <!--          根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"/>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    顶部导航-->
    <div class="layout_header" :class="{fold:!!LayoutSettingStore.fold}">
      <Header/>
    </div>
    <!--    内容展示-->
    <div class="layout_main" :class="{fold:!!LayoutSettingStore.fold}">
      <Main/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
}

.layout_slider {
  width: $base-menu-width;
  height: 100vh;
  background: $base-menu-background;
  transition: all 0.3s;

  .scrollbar {
    background: $base-menu-background;
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }

  &.fold {
    width: $base-menu-min-width;
  }
}

.layout_header {
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: $base-header-height;
  top: 0;
  left: $base-menu-width;
  transition: all 0.3s;
  background: white;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}

.layout_main {
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-header-height);
  left: $base-menu-width;
  top: $base-header-height;
  padding: 20px;
  overflow: auto;
  transition: all 0.3s;
  background: white;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
</style>
