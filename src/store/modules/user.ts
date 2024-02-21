import { defineStore } from "pinia";

//引入接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";

import type { UserState } from "./types/type.ts";

import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type.ts";
//引入操作本地存储的工具文件
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token.ts";

//引入常量路由
import { constantRoute } from "@/router/routes.ts";

let useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
      username: "",
      avatar: "",
    };
  },
  actions: {
    //用户登陆的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      //登录成功token
      //登录失败返回登陆失败错误信息
      if (result.code === 200) {
        this.token = result.data as string;
        //本地存储
        SET_TOKEN(result.data as string);
        //保证当前的async返回一个成功的Promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    //获取用户信息的方法
    async userInfo() {
      //获取用户的信息进行存储仓库当中
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    async userLogout() {
      let result: any = await reqLogout();
      if (result.code === 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});

//暴露
export default useUserStore;
