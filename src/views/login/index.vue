<script setup lang="ts">
import {User, Lock} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";

import {useRoute, useRouter} from "vue-router";

import {ElNotification} from "element-plus";


//获取路由器
let $router = useRouter();

//路由对象
let $route = useRoute();
//引入用户相关的小仓库
import useUserStore from "@/store/modules/user.ts";

//引入获取当前时间的函数
import {getTime} from "@/utils/time.ts";

const userStore = useUserStore();

let loginForm = reactive({username: "admin", password: "111111"});

let loading = ref(false);

//获取el-form组件
let loginForms = ref();

const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule为校验规则对象
  //value为表单文本的内容
  //callback函数,如果符合条件,通过callback放行
  //如果不符合条件,注入错误信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号长度至少五位"));
  }
};

const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule为校验规则对象
  //value为表单文本的内容
  //callback函数,如果符合条件,通过callback放行
  //如果不符合条件,注入错误信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("密码长度至少五位"));
  }
};

//定义表单校验需要的配置对象
const rules = {
  username: [
    // {
    //   required: true,
    //   min: 3,
    //   max: 10,
    //   message: '账号长度至少三位,至多十位',
    //   trigger: 'change'
    // },
    {
      trigger: "change",
      validator: validatorUserName,
    },
  ],
  password: [
    {
      trigger: "change",
      validator: validatorPassword,
    },
  ],
};

async function login() {
  //保证全部表单校验通过后发请求
  await loginForms.value.validate();

  loading.value = true;
  //通知仓库发登录请求
  //请求成功跳转到首页
  //请求失败弹出对应的登陆失败信息
  try {
    //保证登录成功
    await userStore.userLogin(loginForm);
    ElNotification({
      type: "success",
      title: `HI,${getTime()}好`,
      message: "欢迎回来",
    });
    //编程式导航跳转至展示数据首页
    //判断登录的时候是否有query参数
    let redirect: any = $route.query.redirect;
    await $router.push({path: redirect || '/'});
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
}
</script>

<template>
  <div
      style="
      position: absolute;
      width: 100%;
      height: 100%;
      background: #e7ebf0 no-repeat;
      padding: 75px;
    "
  >
    <div class="login_container">
      <el-row>
        <el-col :span="3" :xs="0"></el-col>
        <el-col :span="9" :xs="24">
          <el-form
              class="login_form"
              :model="loginForm"
              :rules="rules"
              ref="loginForms"
          >
            <h1>Hello</h1>
            <h2>欢迎来到熊二甄选</h2>
            <el-form-item prop="username">
              <el-input
                  :prefix-icon="User"
                  v-model="loginForm.username"
                  placeholder="UserName"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  type="password"
                  :prefix-icon="Lock"
                  v-model="loginForm.password"
                  show-password
                  placeholder="Password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                  :loading="loading"
                  type="primary"
                  size="default"
                  class="login_btn"
                  @click="login"
              >Login
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" :xs="0">
          <el-carousel height="330px" class="login_carousel">
            <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="3" :xs="0"></el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: white no-repeat;
  border-radius: 4px;
}

.login_form {
  position: relative;
  width: 80%;
  top: 20vh;
  padding: 40px;
  box-shadow: 0 5px 10px #888888;
  border-radius: 5px;

  .login_btn {
    width: 100%;
  }
}

h1 {
  color: #26333c;
  font-size: 40px;
}

h2 {
  font-size: 20px;
  color: #393a3d;
  margin: 20px 0;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item:nth-child(2n) {
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F22%2F20200122084551_i8Wek.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1710906236&t=52fe64eb0d1d8491fd17b4ce24e6c352");
  background-size: cover;
}

.el-carousel__item:nth-child(2n + 1) {
  background-image: url("https://img0.baidu.com/it/u=3684185131,1081565556&fm=253&fmt=auto&app=120&f=PNG?w=871&h=554");
  background-size: cover;
}

.login_carousel {
  top: 20vh;
}
</style>
