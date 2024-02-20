<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Header from '@/layout/header/index.vue'
import {useRoute} from "vue-router";

let $route = useRoute();
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user.ts";

let userStore = useUserStore();
</script>

<template>
  <div class="layout_container">
    <!--    左侧菜单-->
    <div class="layout_slider">
      <Logo/>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="$base-menu-background" text-color="white" active-text-color="#004080"
                 :default-active="$route.path">
          <!--          根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"/>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    顶部导航-->
    <div class="layout_header">
      <Header/>
    </div>
    <!--    内容展示-->
    <div class="layout_main">
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

  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }
}

.layout_header {
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: $base-header-height;
  top: 0;
  left: $base-menu-width;
}

.layout_main {
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-header-height);
  left: $base-menu-width;
  top: $base-header-height;
  padding: 20px;
  overflow: auto;
}
</style>