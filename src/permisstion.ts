//路由鉴权
import router from "@/router";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";

//获取用户相关仓库内部token数据,判断用户是否登陆成功
import pinia from "@/store";
import useUserStore from "@/store/modules/user.ts";
import setting from "@/setting.ts";

nprogress.configure({ showSpinner: false });

let userStore = useUserStore(pinia);
//获取用户的名字
let username = userStore.username;

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + "-" + to.meta.title;
  nprogress.start();
  //获取token判断登录状态
  let token = userStore.token;
  if (token) {
    //登录判断
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      //登录成功访问其余的6个路由
      //有用户信息放行
      if (username) {
        next();
      } else {
        //如果没有用户信息，在守卫发请求获取到用户信息再放行
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          //token过期
          //用户手动修改了token信息
          //退出登录->清空用户相关数据
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //未登录判断
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});

//第一个问题：任意路由切换实现进度条业务——nprogress
//第二个问题：路由鉴权

//用户未登录，可以访问login，其余六个指向login
//登陆成功后，不可以访问login，其余的路由可以访问
