import { defineStore } from "pinia";

//引入接口
import { reqLogin } from "@/api/user";
//引入数据类型
import type { loginForm, loginResponseData } from "@/api/user/type.ts";

import type { UserState } from "./types/type.ts";

//引入操作本地存储的工具文件
import { GET_TOKEN, SET_TOKEN } from "@/utils/token.ts";

//引入常量路由
import { constantRoute } from "@/router/routes.ts";

let useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
    };
  },
  actions: {
    //用户登陆的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data);
      //登录成功token
      //登录失败返回登陆失败错误信息
      console.log(result);
      if (result.code === 200) {
        this.token = result.data.token as string;
        //本地存储
        SET_TOKEN(result.data.token as string);
        //保证当前的async返回一个成功的Promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});

//暴露
export default useUserStore;
