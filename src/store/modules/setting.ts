//小仓库,layout组件相关
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, //用于控制菜单折叠还是收起
      refresh: false, //控制刷新效果
    };
  },
});

export default useLayoutSettingStore;
