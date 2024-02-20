<script setup lang="ts">
import { FullScreen, Refresh, Setting } from "@element-plus/icons-vue";
</script>

<template>
  <div class="header_right">
    <el-button size="small" :icon="Refresh" circle></el-button>
    <el-button size="small" :icon="FullScreen" circle></el-button>
    <el-button size="small" :icon="Setting" circle></el-button>
    <img
      src="../../../../public/Logo.jpg"
      alt=""
      style="width: 24px; height: 24px; margin: 0 10px"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
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
