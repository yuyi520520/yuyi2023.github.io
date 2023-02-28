<template>
  <div class="cd_main">
    <div class="left"> 
        <CategoryList :cover="categoryDetailList.cover"
                        :name="categoryDetailList.categoryName"
                        :desc="categoryDetailList.categoryDesc"
                        :count="categoryDetailList.blogCount"
                        :categoryId="categoryDetailList.categoryId"
                        :type="0"></CategoryList>
        <div class="blog_list">
            <div v-for="item in blogInfo.list" :key="item">
            <BlogItem :cover="item.cover"
                    :title="item.title"
                    :summary="item.summary"
                    :time="item.createTime"
                    :nickName="item.nickName"
                    :categoryName="item.categoryName"
                    :blogId="item.blogId"
                    :categoryId="item.categoryId"></BlogItem>
            </div>
            <div class="pagination">
            <el-pagination v-if="blogInfo.totalCount"
                        background
                        :total="blogInfo.totalCount"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="blogInfo.pageSize"
                        :current-page="blogInfo.pageNo"
                        layout="total, prev, pager, next"
                        @current-change="handlePageNoChange"
                        style="text-align: right"
                        hide-on-single-page
                        ></el-pagination>
            </div>
        </div>
        
    </div>
    <div class="right"> 
        <!--用户-->
        <div class="part_title">
            <span class="fonts">Who's Blog?</span>
            <router-link to="/user" class="a-link">About&gt;&gt;</router-link>
        </div>
        <div class="c_list">
            <div v-for = "item in userList" :key="item"> 
                <UserItem :cover="item.avatar"
                            :name="item.nickName"
                            :count="item.blogCount"
                            :profession="item.profession"></UserItem>
            </div>
        </div>

        <div class="space"></div>

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
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router';
const {proxy} = getCurrentInstance();
const route=useRoute();

const blogInfo = ref([]);
const categoryList = ref([]);
const userList = ref([]);
const R_PAGE_SIZE = 5;
const api = {
    "loadBlogList": "/view/loadBlogList",
    "loadCategory": "/view/loadCategory",
    "loadUser": "/view/loadTeamUser",
    "getCategory":"/view/getCategory"
}

//分类Id
const categoryId = route.params.categoryId;
const categoryDetailList = ref({});
const loadCategoryDetail = async ()=>{
    let result = await proxy.Request({
        url:api.getCategory,
        params:{
            categoryId
        }
    })
    if(!result){
        return;
    }
    categoryDetailList.value=result.data;
}
loadCategoryDetail();
//博客列表
const loadDataList = async (pageNo) => {
    let result = await proxy.Request({
        url: api.loadBlogList,
        params:{
            pageNo:pageNo,
            pageSize:10,
            categoryId
        }
    })
    if(!result){
        return;
    }
    blogInfo.value = result.data;
}

loadDataList(1);

const handlePageNoChange = (pageNo) =>{
    loadDataList(pageNo);
}

//分类
const loadCategoryList = async () => {
    let result = await proxy.Request({
        url: api.loadCategory,
        params:{
            pageSize:R_PAGE_SIZE,
          
        }
    })
    if(!result){
        return;
    }
    categoryList.value = result.data;
}
loadCategoryList();

//用户
const loadUserList = async () => {
    let result = await proxy.Request({
        url: api.loadUser,
        params:{
            pageSize:1,
        }
    })
    if(!result){
        return;
    }
    userList.value = result.data;
}
loadUserList();
</script>

<style lang="scss">
.cd_main{
    display: flex;
    .left{
        flex:1;
        background-color: #f4f4f4;
        .c_itemlist {
            width:100%;
            border: none;
            background-color: white;
            margin: 0px;
            padding: 25px;
        }
        .blog_list{
            margin-top:15px;
            background-color: white;
            padding: 10px;
        }
        .pagination{
            color: #ddd;
            margin-top: 10px;
            .el-pagination.is-background .btn-next.is-active, .el-pagination.is-background .btn-prev.is-active, .el-pagination.is-background .el-pager li.is-active {
                background-color: rgb(233, 196, 212);
                color: var(--el-color-white);
            }
        }
    }
    .right{
        width: 300px;
        margin-left: 10px;
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
        .c_list{
            margin-bottom: 10px;
        }
        .space{
            height: 200px;
            border-top:1px solid #f5f7ed;
        }
    }
}
</style>
