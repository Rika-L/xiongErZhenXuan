<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<script lang="ts">
export default {
  name: "Header",
};
</script>

<template>
  <div class="header">
    <Breadcrumb />
    <Setting />
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
