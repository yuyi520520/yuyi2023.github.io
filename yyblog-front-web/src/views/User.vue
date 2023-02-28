<template>
  <div class="usermain">
    <div class="userInfo" v-for="(item,index) in userDetail" :key="index">
      <div class="left">
        <div class="name">博主昵称：<span :style="{'color':'#f19f9f','font-weight':'bold'}">{{ item.nickName }}</span></div>
        <div class="pro">标签：{{ item.profession }}</div>
        <div class="count">累计发表博客 {{ item.blogCount }} 篇</div>
        <div v-html="item.introduction" class="desc"></div>
      </div>
      <div class="right">
        <div class="cover" >
            <img :src="proxy.globalInfo.imageUrl+item.avatar"
                v-if="item.avatar">
            <img v-else
                src="../assets/default_img.png">
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,getCurrentInstance } from "vue";

const {proxy} = getCurrentInstance();

const api = {
  "loadUser":"/view/loadTeamUser"
}

const userDetail = ref([]);

const loadUserDetail = async() => {
    let result = await proxy.Request({
      url:api.loadUser,
      params:{
        pageSize:1,
      }
    })
    if(!result){
      return;
    }
    userDetail.value = result.data;
    console.log(userDetail.value);
}
loadUserDetail();
</script>

<style lang="scss">
.usermain{
  background-color: white;
  height: calc(100vh - 120px);
  .userInfo{
    display: flex;
    .left{
      flex:1;
      padding: 50px 50px 30px 150px;
      .name{
        font-size: 30px;
        line-height: 26px;
        color: #b4b1b1;
        margin-bottom: 20px;
      }
      .pro,.count{
        font-size: 15px;
        line-height: 20px;
        color: #b4b1b1;
        margin-bottom: 10px;
      }
      .desc{
        color: #535552;
      }
    }
    .right{
      width:500px;
      padding: 50px;
      .cover {
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          overflow: hidden;

          border-radius: 50%;
          border: 1px solid #ddd;

          img {
              width: 100%;
              height:100%;
          }
      }
    }
  }
  
  
}
</style>
