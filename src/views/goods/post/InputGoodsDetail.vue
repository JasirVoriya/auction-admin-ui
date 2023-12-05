<script lang="ts" setup>
defineOptions({ name: "InputGoodsDetail" });
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type UploadProps } from "element-plus";
import * as categoryApi from "@/api/category";
import { onMounted } from "vue";
import { useMyUserStore } from "@/store/modules/my-user";
import { uploadUrl, downloadUrl } from "@/plugins/request";
import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import * as commonApi from "@/api/common";

//监听date的变化,并将值赋给goods
const goods = ref(useMyUserStore().postGoods);
const dateTime = ref<[Date, Date]>([new Date(), new Date()]);
watch(dateTime, (newVal, oldVal) => {
  goods.value.startTime = newVal[0];
  goods.value.endTime = newVal[1];
});
const options = ref([]);
onMounted(() => {
  //获取所有分类
  categoryApi.getAllCategory().then(res => {
    options.value = res;
  });
});

const headers = ref({
  accessToken: useMyUserStore().accessToken,
  refreshToken: useMyUserStore().refreshToken,
  uuid: useMyUserStore().uuid
});
const handleCoverSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
  if (res.success) {
    ElMessage.success("上传成功");
    goods.value.cover = downloadUrl + "/" + res.result;
    console.log(res);
  } else {
    ElMessage.error("上传失败");
  }
};

const beforeCoverUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const editorConfig = {
  placeholder: "请输入商品详情介绍",
  MENU_CONF: {}
  // readOnly: true
};
editorConfig.MENU_CONF["uploadImage"] = {
  // 选择文件时的类型限制，根据实际业务改写
  allowedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  // 自定义上传
  async customUpload(file: File, insertFn) {
    // 创建一个 FormData 对象
    const formData = new FormData();
    // 将文件添加到 FormData 对象中
    formData.append("file", file);
    commonApi
      .uploadFile(formData)
      .then(res => insertFn(downloadUrl + "/" + res));
  }
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
  <div>
    <div class="w-full flex flex-col">
      <div class="bg-gray-100 m-3 p-2 border-[1px] border-gray-200 rounded-sm">
        <p>基本信息</p>
      </div>
      <div class="m-3 p-2 pl-32 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            商品分类
          </p>
          <el-cascader
            v-model="goods.categoryIds"
            class="w-64"
            :options="options"
            expand-trigger="hover"
          />
        </div>
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            商品名称
          </p>
          <div class="w-64">
            <el-input
              v-model="goods.name"
              class="w-64"
              placeholder="请输入商品名称"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            商品封面
          </p>
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
            :headers="headers"
          >
            <img v-if="goods.cover" :src="goods.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="bg-gray-100 m-3 p-2 border-[1px] border-gray-200 rounded-sm">
        <p>拍卖信息</p>
      </div>
      <div class="m-3 p-2 pl-32 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            拍卖时间
          </p>
          <div class="w-[400px]">
            <div class="flex justify-between gap-5 p-2 bg-yellow-100 my-1 rounded-md">
              <p class="text-xs before:content-['*'] before:text-rose-600">
                开始时间：{{ goods.startTime }}
              </p>
              <p class="text-xs before:content-['*'] before:text-rose-600">
                结束时间：{{ goods.endTime }}
              </p>

            </div>
            <el-date-picker
              v-model="dateTime"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            保&nbsp;&nbsp;证&nbsp;&nbsp;金
          </p>
          <div class="w-64">
            <el-input
              v-model="goods.deposit"
              type="number"
              class="w-64"
              placeholder="请输入保证金"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            起&nbsp;&nbsp;拍&nbsp;&nbsp;价
          </p>
          <div class="w-64">
            <el-input
              v-model="goods.startingPrice"
              type="number"
              class="w-64"
              placeholder="请输入起拍价"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-xs before:content-['*'] before:text-rose-600">
            最低加价
          </p>
          <div class="w-64">
            <el-input
              v-model="goods.increment"
              type="number"
              class="w-64"
              placeholder="请输入最低加价"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="bg-gray-100 m-3 p-2 border-[1px] border-gray-200 rounded-sm">
        <p>拍品详情描述</p>
      </div>
      <div class="m-3 p-2 flex flex-col gap-4">
        <div class="wangeditor">
          <Toolbar
            :editor="editorRef"
            :defaultConfig="{ excludeKeys: 'fullScreen' }"
            style="border-bottom: 1px solid #ccc"
          />
          <Editor
            v-model="goods.intro"
            :defaultConfig="editorConfig"
            style="height: 500px; overflow-y: hidden"
            @onCreated="handleCreated"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.avatar-uploader .avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
