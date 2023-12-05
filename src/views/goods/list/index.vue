<script setup lang="ts">
import { ref } from "vue";
import Search from "@iconify-icons/ri/search-line";
import * as goodsApi from "@/api/goods";

defineOptions({ name: "GoodsList" });
import { onMounted } from "vue";

const goodsList = ref([]);
const pageData = ref({
  page: 1,
  size: 10,
  total: 0
});
const getGoodsList = () => {
  goodsApi.getGoodsList(pageData.value.page, pageData.value.size).then(res => {
    goodsList.value = res.records;
    pageData.value.total = res.total;
    console.log(res);
  });
};
onMounted(() => {
  getGoodsList();
});

const deleteGoods = (index: number) => {
  goodsApi
    .deleteGoods(goodsList.value[index].id)
    .then(res => goodsList.value.splice(index, 1));
};

const searchName = ref("");
const handleSizeChange = (val: number) => {
  pageData.value.size = val;
  getGoodsList();
};
const handleCurrentChange = (val: number) => {
  pageData.value.page = val;
  getGoodsList();
};
</script>

<template>
  <div class="min-w-[1000px] flex flex-col gap-3">
    <div class="flex gap-3 w-full bg-gray-200 p-3 items-center rounded-md">
      <div class="flex items-center text-sm gap-1">
        <p>商品名称</p>
        <div>
          <el-input v-model="searchName" placeholder="请输入商品名称" />
        </div>
      </div>
      <div>
        <button
          class="text-white bg-red-400 flex items-center p-1 pr-2 text-xs rounded-md"
        >
          <IconifyIconOffline :icon="Search" class="ml-1" />
          <span>搜索</span>
        </button>
      </div>
    </div>
    <div>
      <div>
        <el-table border :data="goodsList" style="width: 100%">
          <el-table-column fixed prop="name" label="商品名称" width="300">
            <template #default="scope">
              <div class="flex">
                <img
                  :src="scope.row.cover"
                  :alt="scope.row.name"
                  class="w-16 h-16"
                />
                <span class="ml-2">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="商品编号" width="200" />
          <el-table-column prop="startingPrice" label="起拍价" width="100" />
          <el-table-column prop="increment" label="最低加价" width="100" />
          <el-table-column prop="deposit" label="保证金" width="100" />
          <el-table-column prop="sellerId" label="卖家编号" width="200" />
          <el-table-column prop="startTime" label="开始时间" width="200" />
          <el-table-column prop="endTime" label="结束时间" width="200" />
          <el-table-column fixed="right" label="操作" width="130">
            <template #default="scope">
              <div class="flex">
                <el-button
                  type="primary"
                  size="small"
                  @click.prevent="deleteGoods(scope.$index)"
                >
                  删除
                </el-button>
                <el-button size="small">
                  <router-link :to="`/goods/detail/${scope.row.id}`">查看</router-link>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-center pt-3">
          <el-pagination
            v-model:current-page="pageData.page"
            v-model:page-size="pageData.size"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            small
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
