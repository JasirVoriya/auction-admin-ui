<script setup lang="ts">
defineOptions({ name: "GoodsPost" });
import { useMyUserStore } from "@/store/modules/my-user";
import * as goodsApi from "@/api/goods";
import { ref } from "vue";
import InputGoodsDetail from "./InputGoodsDetail.vue";
import success from "./success.vue";
const current = ref(1);
const successGoods = ref({} as any);
const submit = () => {
  goodsApi.addGoods(useMyUserStore().postGoods).then(res => {
    console.log(useMyUserStore().postGoods);
    useMyUserStore().clearPostGoods();
    console.log(res);
    successGoods.value = res;
    current.value = 2;
  });
};
</script>
<template>
  <div class="flex flex-col">
    <div class="bg-white m-3 pt-5 px-0 rounded-xl shadow-xl">
      <nut-steps :current="current">
        <nut-step title="填写商品详情" />
        <nut-step title="商品发布成功" />
      </nut-steps>
    </div>
    <div class="bg-white m-3 rounded-xl shadow-xl">
      <input-goods-detail v-if="current === 1" />
      <success :goods="successGoods" v-if="current === 2" />
    </div>
    <div
      class="absolute bottom-0 flex gap-2 justify-center w-full bg-yellow-100 p-3"
      v-if="current === 1"
    >
      <button
        class="bg-rose-500 text-xs text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        @click="submit()"
      >
        发布
      </button>
    </div>
  </div>
</template>
