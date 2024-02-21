<script setup lang="ts">
import { useRouter } from "vue-router";
//获取父组件传过来的全部路由数组
defineProps(["menuList"]);
//获取路由器对象
let $router = useRouter();
//点击菜单的回调
const goRoute = (vc: any) => {
  //路由跳转
  $router.push(vc.index);
};
</script>

<script lang="ts">
export default {
  name: "Menu",
};
</script>

<template>
  <template v-for="(item, index) in menuList" :key="index">
    <template v-if="!item.children">
      <!--    没有子路由-->
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length === 1">
      <!--      有子路由但是只有一个-->
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--    有多个子路由-->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<style scoped></style>
