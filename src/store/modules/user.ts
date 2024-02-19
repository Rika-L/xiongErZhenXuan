import {defineStore} from "pinia";

//引入接口
import {reqLogin} from "@/api/user";
//引入数据类型
import type {loginForm} from "@/api/user/type.ts";

let useUserStore = defineStore('User', {
    state: () => {
        return {
            token: localStorage.getItem("TOKEN"),
        }
    },
    actions: {
        //用户登陆的方法
        async userLogin(data: loginForm) {
            let result:any = await reqLogin(data);
            //登录成功token
            //登录失败返回登陆失败错误信息
            console.log(result);
            if (result.code === 200) {
                this.token = result.data.token;
                //本地存储
                localStorage.setItem("TOKEN", result.data.token)
                //保证当前的async返回一个成功的Promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters: {}
})

//暴露
export default useUserStore;