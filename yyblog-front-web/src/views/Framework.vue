<template>
  <div>
    <div class="top">
        <div class="top_nav">
            <router-link to="/" class="logo">YyBlog</router-link>
            <router-link :to="item.path" 
                         :class="['nav_item',item.path==activePath?'active':'']" 
                         v-for="item in menus" :key="item">{{item.name}}</router-link>
        </div>
    </div>
    <div class="body">
        <RouterView />
    </div>
    <div class="footer">
        <div>
            已经到了YyBlog底部哟
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter();
const menus = ref([
    {
        name:"博客",
        path:"/",
    },
    {
        name:"分类专栏",
        path:"/category",
    },
    {
        name:"专题",
        path:"/special",
    },
    {
        name:"关于Yy",
        path:"/user",
    },
])

const activePath = ref(null);
watch(() => router,(newVal,oldVal) =>{
    activePath.value = newVal.currentRoute.value.meta.activePath;
},{ immediate:true, deep:true })
</script>

<style lang="scss">
</style>
