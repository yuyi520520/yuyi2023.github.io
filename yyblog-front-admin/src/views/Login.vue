<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item label="" prop="account" class="item">
          <el-icon size="20px" color="#504c4c"><User /></el-icon>
          <el-input placeholder="请输入账号" v-model="formData.account" class="input"/>
        </el-form-item>
        <el-form-item label="" prop="password" class="item">
          <el-icon size="20px" color="#504c4c"><Key /></el-icon>
          <el-input type="password" placeholder="请输入密码" v-model="formData.password" class="input"/>
        </el-form-item>
        <el-form-item label="" prop="checkCode" class="item">
          <el-icon size="20px" color="#504c4c"><Lock /></el-icon>
          <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input"/><!--@keyup.enter.native="login"-->
        </el-form-item>
        <el-form-item label="">
          <div class="login-rem">
            <el-checkbox v-model="formData.rememberMe" :true-label="1">记住我</el-checkbox>
            <div class="login-code"><img :src="checkCodeUrl" @click="changeCheckCode"></div>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :style="{width:'100%'}" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { User,Key,Lock } from '@element-plus/icons-vue'
import md5 from 'js-md5'
import { ref,reactive, getCurrentInstance } from "vue"
import {useRouter} from 'vue-router'

const {proxy} = getCurrentInstance();
const router = useRouter();
const formData = reactive({});
const formDataRef = ref();

const api = {
  checkCode:"api/checkCode",
  login:"login"
}
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = () =>{
  checkCodeUrl.value = api.checkCode +"?" + new Date().getTime();
}

const rules = {
  account:[{
    required:true,
    message:"请输入用户名",
  }],
  password:[{
    required:true,
    message:"请输入密码",
  }],
  checkCode:[{
    required:true,
    message:"请输入验证码",
  }]
}

const init = () =>{
  const loginInfo = proxy.VueCookies.get("loginInfo");
  if(!loginInfo){
    return;
  }
  Object.assign(formData,loginInfo);

  document.onkeydown = (e) =>{
    if(e.keyCode !== 13){
      return;
    }
    login();
  }
}
init();

const login = () =>{
  formDataRef.value.validate(async(valid) =>{
    if(!valid){
      return;
    }
    let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
    let cookiePassword = cookieLoginInfo == null ? null : cookieLoginInfo.password;
    
    if(formData.password !== cookiePassword){
      formData.password = md5(formData.password)
    }

    let params = {
      account: formData.account,
      password: formData.password,
      checkCode: formData.checkCode
    }

    let result = await proxy.Request({
      url:api.login,
      params:params,
      errorCallback:() =>{
        changeCheckCode();
      }
    })
    if(!result){
      return;
    }

    proxy.Message.success("登录成功");
    setTimeout(() =>{
      router.push("/")
    },1500);
    const loginInfo = {
      account:params.account,
      password:params.password,
      rememberMe:formData.rememberMe
    }
    proxy.VueCookies.set("userInfo",result.data,0);
    if(formData.rememberMe == 1){
      proxy.VueCookies.set("loginInfo",loginInfo,"7d")
    }
  });
}
</script>

<style lang="scss">
.login-body {
  width: 100%;
  height: calc(100vh);//视窗高度
  background-size: cover;//保持纵横比放大缩小进行铺满
  background-position: center;
  background-image: url(../assets/login_h.jpg);
  //垂直水平居中
  display: flex;
  //justify-content: center;
  align-items: center;

  .login-panel{
    padding:20px;
    border-radius: 10px;
    width:350px;
    box-shadow: 2px 2px 10px #ddd;
    background-color:rgba(227, 248, 223, 0.7);
    margin-left:10%;
    .login-title{
      text-align: center;
      margin-bottom: 10px;
      font-size: 18px;
    }

    .login-rem{
      display: flex;
      .login-code{
        flex:1;
        margin-left:60%;
        cursor: pointer;
      }
    }

    .item{
      display: flex;
      .input{
        flex:1;
        margin-left: 5px;
      }
    }
  }
}

</style>
