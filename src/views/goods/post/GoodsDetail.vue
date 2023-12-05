<script lang="ts" setup>
defineOptions({ name: "GoodsDetail" });
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor } from "@wangeditor/editor-for-vue";
import * as goodsApi from "@/api/goods";

const props = defineProps({
  goodsId: {
    type: String,
    default: ""
  }
});
console.log(props.goodsId);
const goods = ref({} as any);
goodsApi.getGoods(props.goodsId).then(res => {
  goods.value = res;
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const editorConfig = {
  readOnly: true,
  scroll : false
};
const handleCreated = editor => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
<template>
  <div class="flex justify-center">
    <div class="w-[900px] bg-gray-200 p-3 rounded-md">
      <div class="w-full flex flex-col">
        <div
          class="bg-gray-100 m-3 p-2 border-[1px] border-gray-200 rounded-sm"
        >
          <p>基本信息</p>
        </div>
        <div class="m-3 p-2 pl-32 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              商品分类
            </p>
            <div class="text-sm text-gray-500 font-bold">
              <span class="flex divide-x-[1px]">
                <span
                  class="px-1 first:pl-0"
                  v-for="name in goods.categoryNames"
                  >{{ name }}</span
                >
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              商品名称
            </p>
            <div class="text-sm text-gray-500 font-bold">
              <span class="flex divide-x-[1px]">
                {{ goods.name }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              商品价格
            </p>
            <div class="text-sm text-rose-500 font-bold">
              <span class="flex divide-x-[1px]"> ￥{{ goods.price }} </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              商品封面
            </p>
            <img v-if="goods.cover" :src="goods.cover" class="w-32 h-32" />
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div
          class="bg-gray-100 m-3 p-2 border-[1px] border-gray-200 rounded-sm"
        >
          <p>拍卖信息</p>
        </div>
        <div class="m-3 p-2 pl-32 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              拍卖时间
            </p>
            <div class="w-[400px]">
              <div
                class="flex justify-between gap-5 p-2 bg-yellow-100 my-1 rounded-md"
              >
                <p class="text-xs before:content-['*'] before:text-rose-600">
                  开始时间：{{ goods.startTime }}
                </p>
                <p class="text-xs before:content-['*'] before:text-rose-600">
                  结束时间：{{ goods.endTime }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              保&nbsp;&nbsp;证&nbsp;&nbsp;金
            </p>
            <div class="text-sm text-rose-500 font-bold">
              <span class="flex divide-x-[1px]"> ￥{{ goods.deposit }} </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              起&nbsp;&nbsp;拍&nbsp;&nbsp;价
            </p>
            <div class="text-sm text-rose-500 font-bold">
              <span class="flex divide-x-[1px]">
                ￥{{ goods.startingPrice }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs before:content-['*'] before:text-rose-600">
              最低加价
            </p>
            <div class="text-sm text-rose-500 font-bold">
              <span class="flex divide-x-[1px]"> ￥{{ goods.increment }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div
          class="bg-gray-100 m-3 p-2 border-[1px] border-gray-200 rounded-sm"
        >
          <p>拍品详情描述</p>
        </div>
        <div class="m-3 p-2 flex flex-col gap-4">
          <div class="wangeditor">
            <Editor
              v-model="goods.intro"
              :defaultConfig="editorConfig"
              style="overflow-y: hidden"
              @onCreated="handleCreated"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
