<template>
  <div class="c_main">
    <div class="category_list">
      <CategoryList v-for="(item,index) in categoryList" :key="index"
        :cover="item.cover"
        :name="item.categoryName"
        :desc="item.categoryDesc"
        :count="item.blogCount"
        :categoryId="item.categoryId"
        :type="0">

      </CategoryList>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance();

const api = {
    "LoadCategory":"/view/loadCategory"
}
const categoryList = ref([]);

const loadCategoryList = async() => {
    let result = await proxy.Request({
        url:api.LoadCategory,
    });
    if(!result){
      return;
    }

    categoryList.value = result.data;
}
loadCategoryList();
</script>

<style lang="scss">
.c_main{
  background-color: white;
  padding: 10px;
  display: flex;
  .category_list{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
