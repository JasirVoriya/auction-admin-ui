<script setup lang="ts">
import { ref } from "vue";
import * as categoryApi from "@/api/category";
import { ElMessage } from "element-plus";

const props = defineProps<{
  category: {
    id: String;
    name: String;
    enable: Boolean;
    level: number;
    parentId: String;
  };
}>();
const children = ref([]);
const cate = ref(props.category);
const editVisible = ref(false);
const addChildVisible = ref(false);
const newName = ref("");

const updateName = () => {
  cate.value.name = newName.value;
  categoryApi
    .updateCategory({ id: cate.value.id, name: newName.value })
    .then(() => {
      ElMessage.success("修改成功");
      editVisible.value = false;
      newName.value = "";
    });
};
const addChild = () => {
  categoryApi
    .addCategory({
      name: newName.value,
      parentId: cate.value.id
    })
    .then(res => {
      children.value.push(res);
      ElMessage.success("添加成功");
      console.log(res);
    });
};
const switchStatus = () => {
  categoryApi
    .updateCategory({
      id: cate.value.id,
      enable: !cate.value.enable
    })
    .then(res => {
      cate.value.enable = !cate.value.enable;
    });
};
const showSubCategory = ref(false);
const firstShow = ref(true);

const showChildren = () => {
  if (showSubCategory.value) {
    showSubCategory.value = false;
    return;
  }
  if (firstShow.value) firstShow.value = false;
  categoryApi.getChildrenCategory(cate.value.id).then(res => {
    children.value = res;
    showSubCategory.value = true;
  });
};
const delVisible = ref(false);
const deleted = ref(false);
const deleteCategory = () => {
  categoryApi.deleteCategory(cate.value.id).then(() => {
    ElMessage.success("删除成功");
    deleted.value = true;
  });
};
</script>
<template>
  <div v-show="!deleted">
    <nut-dialog v-model:visible="editVisible" teleport="#app" @ok="updateName">
      <template #header>
        <span>你正在修改：{{ cate.name }}</span>
      </template>
      <template #default>
        <nut-input v-model="newName" placeholder="请输入新分类名称" />
      </template>
    </nut-dialog>
    <nut-dialog
      v-model:visible="addChildVisible"
      teleport="#app"
      @ok="addChild"
    >
      <template #header>
        <span>
          你正在为
          <span class="text-rose-600 px-2 text-sm">{{ cate.name }}</span>
          添加子分类
        </span>
      </template>
      <template #default>
        <nut-input v-model="newName" placeholder="请输入子分类名称" />
      </template>
    </nut-dialog>
    <nut-dialog
      v-model:visible="delVisible"
      teleport="#app"
      title="删除分类"
      @ok="deleteCategory"
    >
      <template #default>
        <span>
          确定删除分类
          <span class="text-rose-600 px-2 text-sm">{{ cate.name }}</span>
          ？
        </span>
      </template>
    </nut-dialog>
    <div class="flex bg-gray-100 p-3 text-xs border-b-[1px] border-gray-200">
      <div class="flex-1">
        <div class="flex items-center" :class="`ml-${(cate.level - 1) * 2}`">
          <div
            v-if="children.length !== 0 || firstShow"
            class="border-[1px] hover:border-rose-600 cursor-pointer flex justify-center items-center w-4 h-4"
            @click="showChildren"
          >
            <span class="text-gray-400">{{ showSubCategory ? "-" : "+" }}</span>
          </div>
          <div v-else class="w-4 h-4" />
          <span class="text-gray-600 pl-1">{{ cate.name }}</span>
        </div>
      </div>
      <div class="flex-1 text-white">
        <span v-if="cate.enable" class="bg-green-400 p-1 rounded-[3px]"
          >正常启用</span
        >
        <span v-else class="bg-red-400 p-1 rounded-[3px]">禁用</span>
      </div>
      <div class="flex-1 flex gap-1">
        <el-select class="w-16" placeholder="操作" size="small">
          <el-option :key="1" :value="1" @click="editVisible = true">
            <span class="text-xs"> 编辑 </span>
          </el-option>
          <el-option :key="2" :value="2" @click="switchStatus">
            <span class="text-xs">{{ cate.enable ? "禁用" : "启用" }}</span>
          </el-option>
          <el-option :key="3" :value="3" @click="delVisible = true">
            <span class="text-xs text-red-600"> 删除 </span>
          </el-option>
        </el-select>
        <button
          v-if="category.level < 3"
          class="before:content-['+'] bg-red-500 text-white text-xs font-light border-[1px] p-1 rounded-sm"
          @click="addChildVisible = true"
        >
          添加子分类
        </button>
      </div>
    </div>
    <div v-if="showSubCategory">
      <category-item
        v-for="item in children"
        :key="item.name"
        :category="item"
      />
    </div>
  </div>
</template>
