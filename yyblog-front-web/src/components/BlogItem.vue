<template>
  <div class="blog_item">
    <div class="cover">
        <img :src="proxy.globalInfo.imageUrl+cover"
            v-if="cover">
        <img v-else
            src="../assets/default_img.png">
    </div>
    <div class="content">
        <div class="title"><router-link :to="'/blog/'+blogId" class="title">{{ title }}</router-link></div>
        <div class="summary">{{ summary }}</div>
        <div class="info">
            <span class="time">{{ time }}</span>
            <span class="nick_name">作者：<router-link to="/user" class="a-link">{{ nickName }}</router-link></span>
            <span class="category_name">
                分类专栏：
                <router-link :to="'/category/'+categoryId" class="a-link"
                             v-if="categoryId!=null&&categoryId!=0">{{ categoryName }}
                </router-link>
                <router-link to="/category" v-else>全部</router-link>
            </span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"

const {proxy} = getCurrentInstance();
const props = defineProps({
    blogId: {
        type:String,
    },
    cover: {
        type:String,
    },
    title: {
        type:String,
    },
    summary: {
        type:String,
    },
    time: {
        type:String,
    },
    nickName: {
        type:String,
    },
    categoryName: {
        type:String,
    },
    categoryId: {
        type:String,
    },
})
</script>

<style lang="scss">
.blog_item {
    display: flex;
    padding: 10px 0px; 
    border-bottom: 1px solid #ddd;
    .cover {
        background: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110px;
        height: 110px;
        overflow: hidden;
        img {
          width: 100%;
          height:100%;
        }
    }
    .content{
        flex:1;
        margin-left: 12px;
        .title{
            color:rgb(47, 129, 98);
            font-weight: bold;
            text-decoration: none;
        }
        .summary{
            margin-top: 6px;
            font-size: 14px;
            line-height: 22px;
            color: #6b6666;
            display: block;

            word-break: break-all;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .info{
            color:#6b6666;
            font-size:13px;
            margin-top:10px;
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
    }
}
</style>
