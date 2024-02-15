import {createApp} from "vue";
import App from "@/App.vue";

//引入element-Plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//获取应用实例对象
const app = createApp(App)

//安装插件
app.use(ElementPlus, {
    locale: zhCn,
})

//svg插件需要的配置
import 'virtual:svg-icons-register'

//引入自定义插件对象,注册整个项目的全局组件
import globalComponent from '@/components';

//安装自定义插件
app.use(globalComponent);

//引入模板的全局样式
import '@/style/index.scss'

//测试代码
import axios from "axios";
//登录接口
axios({
    url:'/api/user/login',
    method:'post',
    data:{
        username:'admin',
        password:'111111'
    }
})

//挂载
app.mount("#app");

