<script setup lang="ts">
defineOptions({ name: "GoodsPost" });
import { ref } from "vue";
import InputGoodsDetail from "./InputGoodsDetail.vue";
import success from "@/views/result/success.vue";
const current = ref(1);
const clickStep = (step: number) => {
  current.value += step;
  if (current.value < 1 || current.value > 2) {
    current.value -= step;
  }
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
      <success v-if="current === 2" />
    </div>
    <div
      class="absolute bottom-0 flex gap-2 justify-center w-full bg-yellow-100 p-3"
    >
      <button
        :disabled="current === 1"
        class="bg-rose-500 text-xs text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        @click="clickStep(-1)"
      >
        上一步
      </button>
      <button
        :disabled="current === 3"
        class="bg-rose-500 text-xs text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        @click="clickStep(1)"
      >
        下一步
      </button>
    </div>
  </div>
</template>
