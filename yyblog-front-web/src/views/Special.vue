<template>
  <div class="s_main">
    <div class="category_list">
      <CategoryList v-for="(item,index) in specialList.list" :key="index"
        :cover="item.cover"
        :name="item.categoryName"
        :desc="item.categoryDesc"
        :count="item.blogCount"
        :categoryId="item.categoryId"
        :type="1">

      </CategoryList>
    </div>
    <div class="pagination">
        <el-pagination v-if="specialList.totalCount"
                    background
                    :total="specialList.totalCount"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="specialList.pageSize"
                    :current-page="specialList.pageNo"
                    layout="total, prev, pager, next"
                    @current-change="handlePageNoChange"
                    style="text-align: right"
                    hide-on-single-page
                    ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance();

const api = {
    "LoadSpecial":"/view/loadSpecial"
}
const specialList = ref([]);

const LoadSpecialList = async(pageNo) => {
    let result = await proxy.Request({
        url:api.LoadSpecial,
        params:{
          pageNo:pageNo,
          pageSize:16
        }
    });
    if(!result){
      return;
    }

    specialList.value = result.data;
}
LoadSpecialList(1);

const handlePageNoChange = (pageNo) =>{
  LoadSpecialList(pageNo);
}
</script>

<style lang="scss">
.s_main{
  background-color: white;
  padding: 10px;
  .category_list{
    display: flex;
    flex-wrap: wrap;
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
</style>
