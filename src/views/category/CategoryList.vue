<script setup lang="ts">
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "GoodsCategory"
});
const props = defineProps({
  type: Number
});
import { ref } from "vue";
import CategoryItem from "./CategoryItem.vue";
import { type } from "os";
import * as categoryApi from "@/api/category";
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
const addVisible = ref(false);
const newName = ref("");
const categoryList = ref([]);
const getTopCategory =
  props.type === 1 ? categoryApi.getTopCategory : categoryApi.getJudicialTopCategory;
onMounted(() => {
  getTopCategory().then(res => {
    categoryList.value = res;
  });
});
const addCategory = () => {
  categoryApi
    .addCategory({
      name: newName.value,
      level: 1,
      type: props.type
    })
    .then(res => {
      ElMessage.success("添加成功");
      console.log(res);
      categoryList.value.push(res);
    });
};
</script>
<template>
  <div>
    <nut-dialog v-model:visible="addVisible" teleport="#app" @ok="addCategory">
      <template #header>
        <span>你正在添加一级分类</span>
      </template>
      <template #default>
        <nut-input v-model="newName" placeholder="请输入分类名称" />
      </template>
    </nut-dialog>
    <div class="pb-6">
      <button
        class="before:content-['+'] text-gray-500 border-gray-500 text-xs font-light border-[1px] p-1 rounded-sm bg-gray-100"
        @click="addVisible = !addVisible"
      >
        添加一级分类
      </button>
    </div>
    <div>
      <div class="flex bg-gray-200 p-1 text-xs font-bold">
        <span class="flex-1">分类名称</span>
        <span class="flex-1">状态</span>
        <span class="flex-1">操作</span>
      </div>
      <div v-if="categoryList.length!==0">
        <category-item
          v-for="cate in categoryList"
          :key="cate.id"
          :category="cate"
        />
      </div>
      <div class="flex justify-center" v-else>
        <span class="text-gray-500 p-10">没有分类</span>
      </div>
    </div>
  </div>
</template>
```
