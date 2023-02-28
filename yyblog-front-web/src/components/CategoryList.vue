<template>
  <div class="c_itemlist">
    <div class="cover">
        <img :src="proxy.globalInfo.imageUrl+cover"
            v-if="cover">
        <img v-else
            src="../assets/default_img.png">
    </div>
    <div class="content">
        <div class="name">
            <router-link  :to="'/category/'+categoryId" class="name" v-if="type == 0">{{ name }}</router-link>
            <router-link  :to="'/special/'+categoryId" class="name" v-else>{{ name }}</router-link>
        </div>
        <div class="desc">{{ desc }}</div>
        <div class="count">博客数：{{ count }}篇</div>
    </div>
    
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"

const {proxy} = getCurrentInstance();
const props=defineProps({
    categoryId:{
        type:Number,
        default:0,
    },
    cover:{
        type:String,
    },
    name:{
        type:String,
    },
    desc:{
        type:String,
    },
    count:{
        type:Number,
        default:0,
    },
    type:{
        type:Number,
        default:0,
    },
})
</script>

<style lang="scss">
.c_itemlist {
    display: flex;
    padding: 10px 10px; 
    border: 1px solid #ddd;
    width:300px;
    margin: 10px;
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
        .name{
            color:rgb(47, 129, 98);
            font-weight: bold;
            font-size: 18px;
            text-decoration: none;
        }
        .desc{
            margin-top: 16px;
            font-size: 14px;
            line-height: 22px;
            color: #2d3530;

            word-break: break-all;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .count{
            margin-top: 16px;
            font-size: 13px;
            color:#888383;
        }
    }
}
</style>
