<template>
  <div class="detail_main">
    <div class="left">
      <div class="title">{{ blogInfo.title }}</div>
      <div class="info">
        <span class="time">{{ blogInfo.createTime }}</span>
        <span class="nick_name">作者：<router-link to="/user" class="a-link">{{ blogInfo.nickName }}</router-link></span>
        <span class="category_name">分类专栏：<router-link to="/category" class="a-link">{{ blogInfo.categoryName }}</router-link></span>
      </div>
      <div v-html="blogInfo.content" class="content" id="content"></div>
    </div>
    <div class="right" :style="{left:leftNum+'px'}">
      <!--目录结构-->
      <div class="part_title">
          <span class="fonts">目录结构</span>
      </div>
      <div class="list">
          <div v-if="tocArray.length == 0" class="notoc">暂无目录</div>
          <div v-else v-for="item in tocArray" :key="item.id">
            <div class="tocitem" :style="{'padding-left':((item.level-1)*15+5)+'px'}">
              <a :href="'#'+ item.id" >{{ item.title }}</a>
            </div>
          </div>
      </div>

      <!--分类-->
      <div class="part_title">
          <span class="fonts">分类专栏</span>
          <router-link to="/category" class="a-link">更多&gt;&gt;</router-link>
      </div>
      <div class="c_list">
          <div v-for = "item in categoryList" :key="item"> 
              <CategoryItem :cover="item.cover"
                          :name="item.categoryName"
                          :count="item.blogCount"
                          :categoryId="item.categoryId"
                          :type="0"></CategoryItem>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css"; //样式

import { useRoute } from 'vue-router';
import { getCurrentInstance, ref,nextTick } from 'vue';
const route = useRoute();
const {proxy} = getCurrentInstance();
const api = {
  "blogDetail":"/view/getBlogDetail",
  "loadCategory": "/view/loadCategory",
}

const leftNum = ref(1050 + (window.innerWidth - 1350)/2);
const blogId = ref(route.params.blogId);

//详情
const blogInfo = ref({});
const getBlogDetail = async() => {
  let result = await proxy.Request({
    url:api.blogDetail,
    params:{
      blogId:blogId.value
    }
  })
  if(!result){
    return;
  }
  blogInfo.value = result.data;
  nextTick(() => {
    //高亮显示
    let blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });

    createToc();//获取目录

    //判断滚动条
    let hasSollerBar = document.body.scrollHeight>window.innerHeight;
    if(hasSollerBar){
      leftNum.value = leftNum.value - 4;
    }
  });
}
getBlogDetail();

//分类
const categoryList = ref([]);
const loadCategoryList = async () => {
    let result = await proxy.Request({
        url: api.loadCategory,
        params:{
            pageSize:5,
        }
    })
    if(!result){
        return;
    }
    categoryList.value = result.data;
}
loadCategoryList();

//目录
const tocArray = ref([]);
const createToc = () =>{
    const tocTags = ["H1","H2","H3","H4","H5","H6"]
    let contentDom = document.querySelector("#content");
    const childNodes = contentDom.childNodes;
    tocArray.value=[];
    let index=0;
    childNodes.forEach(item =>{
      let tagName = item.tagName;
      if(tagName == undefined){
        return true;
      }
      if(!tocTags.includes(tagName.toUpperCase())){
        return true;
      }
      index++;
      let id = "toc" + index;
      item.setAttribute("id",id);
      tocArray.value.push({
        id: id,
        title: item.innerText,
        level: Number.parseInt(tagName.substring(1))
      })
    })
}
</script>

<style lang="scss">
.detail_main{
    display: flex;
    .left{
        width: 1040px;
        background-color: white;
        padding: 15px;
        .title{
          font-weight: bold;
          font-size:30px;
          color: rgb(47, 129, 98);
        }
        .info{
            background-color: #f2f3f0;
            color:#6b6666;
            font-size:13px;
            margin-top:10px;
            padding: 10px;
            .time{
                margin-right: 10px;
            }
            .nick_name{
                margin-right: 10px;
            }
            .category_name{
                margin-right: 10px;
            }
        }
        .content{
          margin-top:20px;
          word-break: break-all;
          line-height: 26px;
          img{
            max-width:100%;
          }
        }
    }
    .right{
        position:fixed;
        width: 300px;
        background-color: white;
        padding: 10px;
        .part_title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0px 5px 8px 5px;
            .a-link{
                font-size: 13px;
            }
            .fonts{
                color: rgb(47, 105, 60);
            }
        }
        .list{
          padding: 10px 5px;
          margin-bottom: 30px;
          .notoc{
            text-align: center;
            color: #6b6666;
          }
          .tocitem{
            font-size: 14px;
            line-height: 25px;
            cursor: pointer;
            a {
              color: #6b6666;
              text-decoration: none;
            }
          }
          .tocitem:hover {
            background-color: #e0f0d2;
          }
        }
        .c_list{
            margin-bottom: 10px;
        }
    }
}
h1{
  font-size:1.5em;
}
h2{
  font-size:1.3em;
}

</style>
