<template>
  <div class="s_body">
    <div class="left">
        <div class="special_info">
            <div class="cover">
                <img :src="proxy.globalInfo.imageUrl+specialInfo.cover"
                    v-if="specialInfo.cover">
                <img v-else
                    src="../assets/default_img.png">
            </div>
            <div class="special_panel">
                <div class="name">{{ specialInfo.categoryName }}</div>
                <div class="count">文章数：{{ specialInfo.blogCount }}</div>
            </div>
        </div>
        <div class="desc">简介：{{ specialInfo.categoryDesc }}</div>
        <div class="tree">
            <el-tree
                ref="treeRef"
                class="filter-tree"
                node-key="blogId"
                :data="blogList"
                :props="defaultProps"
                default-expand-all
                :highlight-current="true"
                :expand-on-click-node="false"
                @node-click="getBlogDetail" />
        </div>
    </div>
    <div class="right">
        <div v-html="blogInfo.content" class="content" id="content"></div>
        <div class="list" :style="{left:leftNum+'px'}">
            <!--目录结构-->
            <el-collapse v-model="activeToc">
                <el-collapse-item title="目录结构" name="toc">
                    <div v-if="tocArray.length == 0" class="notoc">暂无目录</div>
                    <div v-else v-for="item in tocArray" :key="item.id" class="toclist">
                        <div class="tocitem" :style="{'padding-left':((item.level-1)*15+5)+'px'}">
                        <a :href="'#'+ item.id" >{{ item.title }}</a>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
  </div>
</template>

<script setup>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css"; //样式
import { ElTree } from 'element-plus'

import { getCurrentInstance, ref,nextTick } from 'vue';
import { useRoute } from 'vue-router';
const {proxy} = getCurrentInstance();
const route = useRoute();
const categoryId = route.params.specialId;
const api = {
    "getSpecialDetail":"/view/getSpecialDetail",
    "blogDetail":"/view/getBlogDetail",
}
const activeToc = ref(["toc"]);
const leftNum = ref(1100 + (window.innerWidth - 1350)/2);
const specialInfo = ref({});
const blogList = ref([]);
const treeRef = ref();
const loadSpecialInfo = async() => {
    let result = await proxy.Request({
        url:api.getSpecialDetail,
        params:{
            categoryId:categoryId
        }
    })
    if(!result){
        return;
    }
    specialInfo.value=result.data.blogCategory;
    blogList.value=result.data.blogList;
    
    const firstBlogId = result.data.blogList[0].blogId;
    nextTick(() =>{
        treeRef.value.setCurrentKey(firstBlogId);
    })
    getBlogDetail({blogId:firstBlogId});
    
}
loadSpecialInfo();

const defaultProps = {
  children: 'children',
  label: 'title',
}

//获取博客Id详情
const blogInfo = ref({});
const getBlogDetail = async(node) => {
    console.log(node.blogId);
    
    let result = await proxy.Request({
        url:api.blogDetail,
        params:{
            blogId:node.blogId
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
.s_body{
    background-color: white;
    overflow: hidden;
    .left{
        width:300px;
        float:left;
        .special_info{
            padding:10px;
            display: flex;
            .cover {
                background: #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                overflow: hidden;
                border: 1px solid #ddd;
                img {
                    width: 100%;
                    height:100%;
                }
            }
            .special_panel{
                padding: 10px;
                .name{
                    color:rgb(44, 97, 46);
                    font-weight: bold;
                }
                .count{
                    margin-top:15px;
                    color: #6b6666;
                    font-size: 14px;
                }
            }
        }
        .desc{
            font-size: 14px;
            line-height: 22px;
            color: #3f4b43;
            margin-left: 10px;
            word-break: break-all;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .tree{
            padding: 5px 5px;
        }
    }
    .right{
        margin-left: 300px;
        border-left:1px solid #ddd;
        padding: 10px;
        min-height: calc(100vh - 120px);
        position: relative;
        #content {
            width:100%;
            overflow: auto;
            word-break: break-all;
            line-height: 26px;
            img{
                max-width:100%;
            }
        }
        .list{
            position:fixed;
            top:90px;
            width:250px;
            box-shadow: 0px 2px 6px 0 #ddd;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            .notoc{
                text-align: center;
                color: #6b6666;
                border-top: 1px solid #ddd;
                padding-top: 10px;
            }
            .toclist{
                border-top: 1px solid #ddd;
                max-height: 500px;
                overflow: auto;
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
            .el-collapse-item__header{
                color: rgb(73, 121, 62);
                font-weight: bold;
                padding:10px;
            }
        }
    }
}
</style>
