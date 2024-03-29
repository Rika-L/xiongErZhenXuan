//对外暴露插件对象
//引入项目中的全部组件
import SvgIcon from "@/components/SvgIcon/index.vue";

//引入全部的图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//全局对象
const allGlobalComponent: any = { SvgIcon };
export default {
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key]);
    });
    //将图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
