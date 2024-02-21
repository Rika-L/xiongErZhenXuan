<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting.ts";
import {useRoute} from "vue-router";
//获取layout配置相关的仓库
let LayoutSettingStore = useLayoutSettingStore();

let $route = useRoute();

const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

</script>

<script lang="ts">
export default {
  name: 'breadcrumb'
}
</script>

<template>
  <div class="header_left">
    <!--    顶部左侧静态-->
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="LayoutSettingStore.fold?'Fold':'Expand'">
      </component>
    </el-icon>
    <!--        左侧面包屑-->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
        <!--        面包屑展示匹配路由的标题-->
        <el-icon style="margin: 0 2px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.header_left {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
</style>
