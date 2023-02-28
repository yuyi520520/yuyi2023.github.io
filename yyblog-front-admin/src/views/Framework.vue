<template>
  <div class="layout">
    <el-container >
      <el-header class="header">
        <div class="logo">YyBlog's Admin</div>
        <div class="userinfo">
          <span>欢迎回来，</span>
          <el-dropdown trigger="click">
            <span class="dropdown-link">
              {{ userInfo.nickName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goUserInfo">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="avatar"><img :src="userInfo.avatar"></div>
        </div>
        <div class="publish">
          <el-button class="publish-btn" @click="createHtml">发布</el-button>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside">
          <div class="menu-panel">
            <el-menu
              default-active="2"
              class="menu-demo"
              background-color="#F0E6E6"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu index="1" >
                <template #title>
                  <el-icon><Document /></el-icon>
                  <span>博客</span>
                </template>
                  <el-menu-item index="1-1" :class="[activePath=='/blog/list'? 'active':'']">
                    <router-link to="/blog/list" 
                      class="routerlink">
                      博客管理
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2" :class="[activePath=='/blog/classify'? 'active':'']">
                    <router-link to="/blog/classify" 
                      class="routerlink">
                      分类管理
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="1-3" :class="[activePath=='/blog/subject'? 'active':'']">
                    <router-link to="/blog/subject" 
                      class="routerlink">
                      专题管理
                    </router-link>
                  </el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><Setting /></el-icon>
                  <span>设置</span>
                </template>
                  <el-menu-item index="2-1" :class="[activePath=='/set/personal'? 'active':'']">
                    <router-link to="/set/personal" 
                      class="routerlink">
                      个人信息设置
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2" :class="[activePath=='/set/system'? 'active':'']">
                    <router-link to="/set/system" 
                      class="routerlink">
                      系统设置
                    </router-link>
                  </el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><Delete /></el-icon>
                  <span>回收站</span>
                </template>
                  <el-menu-item index="3-1" :class="[activePath=='/recycle'? 'active':'']">
                    <router-link to="/recycle" 
                      class="routerlink">
                      回收站
                    </router-link>
                  </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </div>
          
        </el-aside>
        <el-main class="main"><router-view /></el-main>
      </el-container>
    </el-container>
    <Dialog :show="progressDialog.show"
            :title="progressDialog.title"
            :buttons="progressDialog.buttons"
            @close="progressDialog.show=false"
            :show-close="false"
            :showCancel="false"
            width="400px">
      <div class="progress-container">
        <div class="progress-panel">
          <el-progress type="circle"
                       :percentage="progressInfo.progress"
                       :status="progressInfo.status"
                       :color="colors" />
        </div>
        <div class="error"
             v-if="progressInfo.result == 0">
          <div>生成页面出错了：{{ progressInfo.errorMsg }}</div>
          <div class="info">具体错误，请查看日志</div>
        </div>
        <div class="success"
             v-if="progressInfo.progress == 100 && progressInfo.result == 1">
          发布成功
        </div>
        <div class="btn-panel"
             v-if="progressInfo.progress == 100 || progressInfo.result == 0">
          <el-button class="btn"
                     type="primary"
                     @click="progressDialog.show=false">关闭</el-button>
        </div>
      </div>
    </Dialog>
  </div>
</template>



<script setup>
import {useStore} from 'vuex'
import { ref,getCurrentInstance,watch, reactive } from "vue"
import { useRoute,useRouter } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Delete,
  Setting,
  ArrowDown
} from '@element-plus/icons-vue'
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();
const api = {
  "getUserInfo": "getUserInfo",
  "logout": "logout",
  "createHtml": "createHtml",
  "checkProgress": "checkProgress"
}
const handleOpen = () => {
  console.log("open")
}
const handleClose = () => {
  console.log("close")
}

const userInfo=ref({});
const goUserInfo = () =>{
  router.push("../set/personal");
}
const logout = () => {
  proxy.Confirm(`你确定要退出吗？`, async () => {
    let result = await proxy.Request({
      url: api.logout,
    })
    if (!result) {
      return;
    }
    router.push("/login");
  })
}
/*const init = () =>{
  userInfo.value = VueCookies.get("userInfo");
  userInfo.value.avatar = proxy.globalInfo.imageUrl + userInfo.value.avatar;
  
}
init();*/
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: api.getUserInfo
  })

  if (!result) {
    return;
  }
  userInfo.value = result.data;
  userInfo.value.avatar = proxy.globalInfo.imageUrl + userInfo.value.avatar;
}
getUserInfo();
const activePath = ref(null);
watch(route,(newVal,oldVal) =>{
  activePath.value = newVal.path;
},{immediate:true,deep:true});

//监听store
watch(() => store.state.userInfo, (newVal,oldVal) =>{
  const avatar = proxy.globalInfo.imageUrl + newVal.avatar;
  const nickName = newVal.nickName;
  userInfo.value = { avatar,nickName };
},{immediate:true,deep:true});


//发布
const colors = [
  { color:"#f56c6c", percentage:20 },
  { color:"#e6a23c", percentage:40 },
  { color:"#6f7ad3", percentage:60 },
  { color:"#1989fa", percentage:80 },
  { color:"#5cb87a", percentage:100 },
];

const progressDialog = reactive({
  title:"发布",
  buttons:[],
  show:false,
});

const progressInfo = reactive({
  progress: 0,
})

let checkTimer = null;
const createHtml = async () => {
  progressDialog.show = true;
  progressInfo.progress = 0;
  progressInfo.status = undefined;
  let result = await proxy.Request({
    url: api.createHtml,
  });
  if(!result){
    return;
  }
  checkProgress();
  checkTimer = setInterval(() => {
    checkProgress();
  },1000);
};
const checkProgress = async () => {
  let result = await proxy.Request({
    url:api.checkProgress,
    showLoading: false,
  });
  if(!result){
    return;
  }
  if(result.data.result == 0) {
    progressInfo.status = "exception";
    progressInfo.errorMsg = result.data.errorMsg;
  }else{
    progressInfo.progress = result.data.progress;
  }
  progressInfo.result = result.data.result;
  if((result.data.progress == 100 || result.data.result == 0 )&&
    checkTimer != null){
      clearInterval(checkTimer);
    } 
};
</script>

<style lang="scss">
.layout{
  .header{
    /*background-image: url("../assets/head.jpg"); */
    background-color: #fcf9fc;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .logo{
      font-size: 32px;
      font-weight: bold;
      color: #e49494;
      width:300px;
    }
    .userinfo{
      display:flex;
      align-items: center;
      .dropdown-link{
        cursor: pointer;
        color:cornflowerblue;
      }
      .avatar{
        width:50px;
        margin-left: 10px;
        img{
          width:100%;
          height:100%;
          border-radius: 25px;
        }
      }
    }
    
    .publish{
      margin: 20px 20px;
      .publish-btn{
        width: 150px;
        color: white;
        background-color: rgb(241, 150, 150);
        border-radius: 5px;
      }
    }
  }
  .container{
    height: calc(100vh - 60px);
    padding-top: 10px;
    background: rgb(240, 230, 230);
    .aside{
      width:250px;
      padding: 0px 15px;
      .menu-panel{
        .menu-demo{
          margin-top: 10px;
          .routerlink{
            width:100%;
            text-decoration: none;
            color: rgb(23, 22, 22);
          }
        }
        .active{
          background-color:#C0B8B8;
          .routerlink{
            width:100%;
            text-decoration: none;
            color: rgb(205, 28, 28);
          }
        }
      }
    }
    .main{
      position: relative;
      background-color: white;
    }
  }
}

.progress-container {
  .progress-panel {
    display: flex;
    justify-content: center;
  }
  .error{
    color: red;
    margin-top: 20px;
    .info{
      font-size:13px;
    }
  }
  .success{
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    color:green;
  }
  .btn-panel{
    text-align: center;
    margin-top:20px;
    .btn{
      margin: 0px auto;
    }
  }
}
</style>
