<template>
  <div class="c_item">
    <div class="cover">
        <img :src="proxy.globalInfo.imageUrl+cover"
            v-if="cover">
        <img v-else
            src="../assets/default_img.png">
    </div>
    <div class="name">
        <router-link  :to="'/category/'+categoryId" class="a-link" v-if="type == 0">{{ name }}</router-link>
        <router-link  :to="'/special/'+categoryId" class="a-link" v-else>{{ name }}</router-link>
    </div>
    <div class="count">{{ count }}篇</div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"

const {proxy} = getCurrentInstance();
const props = defineProps({
    cover:{
        type:String,
    },
    name:{
        type:String,
    },
    count:{
        type:Number,
        default:0,
    },
    categoryId:{
        type:String,
        default:null,
    },
    type:{
        type:Number,
        default:0,
    }
})
</script>

<style lang="scss">
.c_item{
    display: flex;
    padding: 10px 0px;
    align-items: center;
    .cover {
        background: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        overflow: hidden;
        img {
          width: 100%;
          height:100%;
        }
    }
    .name{
        flex:1;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        
        font-size:14px;
        margin:0px 5px;
    }
    .count{
        width:30px;
        font-size: 13px;
        color:#4d4a4a;
    }
}
</style>
