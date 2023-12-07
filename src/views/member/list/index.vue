<script setup lang="ts">
import { ref } from "vue";
import Search from "@iconify-icons/ri/search-line";
import * as memberApi from "@/api/member";

defineOptions({ name: "MemberList" });
import { onMounted } from "vue";

const memberList = ref([]);
const pageData = ref({
  page: 1,
  size: 10,
  total: 0
});
const getGoodsList = () => {
  memberApi.getAllUser(pageData.value.page, pageData.value.size).then(res => {
    memberList.value = res.records;
    pageData.value.total = res.total;
    console.log(res);
  });
};
onMounted(() => {
  getGoodsList();
});

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
        <p>会员头像</p>
        <div>
          <el-input v-model="searchName" placeholder="请输入会员名称" />
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
        <el-table border :data="memberList" style="width: 100%">
          <el-table-column fixed prop="name" label="会员头像" width="100">
            <template #default="scope">
              <div class="flex">
                <img
                  :src="scope.row.avatar"
                  class="w-16 h-16"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="200" />
          <el-table-column prop="id" label="会员编号" width="200" />
          <el-table-column prop="email" label="邮箱" width="250" />
          <el-table-column prop="money" label="余额" width="100" />
          <el-table-column prop="updateTime" label="最近修改" width="100" />
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
