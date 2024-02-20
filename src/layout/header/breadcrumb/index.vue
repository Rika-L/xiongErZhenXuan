<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
</script>

<template>
  <div class="header_left">
    <!--    顶部左侧静态-->
    <el-icon style="margin-right: 10px">
      <Expand />
    </el-icon>
    <!--        左侧面包屑-->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
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
