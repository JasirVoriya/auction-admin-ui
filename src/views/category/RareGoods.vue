<script setup lang="ts">
import CategoryList from "./CategoryList.vue";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "RareGoods"
});
</script>
<template>
  <div>
    <category-list :type="1" />
  </div>
</template>
