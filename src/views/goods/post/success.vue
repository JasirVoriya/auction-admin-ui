<script setup lang="ts">
import { useMyUserStore } from "@/store/modules/my-user";
defineOptions({
  name: "Success"
});
const props = defineProps({
  goods: {} as any
});

const columns = [
  {
    label: "商品 ID：",
    value: props.goods.id
  },
  {
    label: "发布方：",
    value: useMyUserStore().userInfo.username 
  },
  {
    label: "发布时间：",
    value: props.goods.createTime
  }
];
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">成功页</span>
      </div>
    </template>
    <el-result
      icon="success"
      title="发布成功"
      sub-title="商品发布成功，请等待审核。"
    >
      <template #extra>
        <div class="flex">
          <el-button type="primary">
            <router-link :to="`/`">返回首页</router-link>
          </el-button>
          <el-button>
            <router-link :to="`/goods/detail/${goods.id}`">查看商品</router-link>
          </el-button>
        </div>
      </template>
    </el-result>
    <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
      <PureDescriptions title="商品信息" :columns="columns" class="mb-5" />
      <el-steps :active="2">
        <el-step title="发布成功">
          <template #description>
            <p>{{ useMyUserStore().userInfo.username }}</p>
            <p>{{ goods.createTime }}</p>
          </template>
        </el-step>
        <el-step title="管理员审核">
          <template #description>
            <p class="flex items-center">
              拍卖平台
            </p>
          </template>
        </el-step>
        <el-step title="商品上线" />
      </el-steps>
    </div>
  </el-card>
</template>

<style scoped>
:deep(.el-descriptions__body) {
  background: transparent;
}
</style>
