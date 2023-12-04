<script lang="ts" setup>
import { ref } from "vue";
import Editor from "@/views/editor/picUpload.vue";
import { Plus } from "@element-plus/icons-vue";

const goods = {
  sellerId: 1,
  categoryId: 2,
  name: "Sample Goods",
  intro: "This is a sample goods description.",
  price: 99.99,
  cover: "/images/sample.jpg",
  startingPrice: 50.0,
  increment: null,
  deposit: null,
  startTime: null,
  endTime: null
};

const props = {
  expandTrigger: "hover" as const
};

const handleChange = value => {
  console.log(value);
};
const value2 = ref("");

const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency"
          },
          {
            value: "feedback",
            label: "Feedback"
          },
          {
            value: "efficiency",
            label: "Efficiency"
          },
          {
            value: "controllability",
            label: "Controllability"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation"
          },
          {
            value: "top nav",
            label: "Top Navigation"
          }
        ]
      }
    ]
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout"
          },
          {
            value: "color",
            label: "Color"
          },
          {
            value: "typography",
            label: "Typography"
          },
          {
            value: "icon",
            label: "Icon"
          },
          {
            value: "button",
            label: "Button"
          }
        ]
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio"
          },
          {
            value: "checkbox",
            label: "Checkbox"
          },
          {
            value: "input",
            label: "Input"
          },
          {
            value: "input-number",
            label: "InputNumber"
          },
          {
            value: "select",
            label: "Select"
          },
          {
            value: "cascader",
            label: "Cascader"
          },
          {
            value: "switch",
            label: "Switch"
          },
          {
            value: "slider",
            label: "Slider"
          },
          {
            value: "time-picker",
            label: "TimePicker"
          },
          {
            value: "date-picker",
            label: "DatePicker"
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker"
          },
          {
            value: "upload",
            label: "Upload"
          },
          {
            value: "rate",
            label: "Rate"
          },
          {
            value: "form",
            label: "Form"
          }
        ]
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table"
          },
          {
            value: "tag",
            label: "Tag"
          },
          {
            value: "progress",
            label: "Progress"
          },
          {
            value: "tree",
            label: "Tree"
          },
          {
            value: "pagination",
            label: "Pagination"
          },
          {
            value: "badge",
            label: "Badge"
          }
        ]
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert"
          },
          {
            value: "loading",
            label: "Loading"
          },
          {
            value: "message",
            label: "Message"
          },
          {
            value: "message-box",
            label: "MessageBox"
          },
          {
            value: "notification",
            label: "Notification"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "Menu"
          },
          {
            value: "tabs",
            label: "Tabs"
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb"
          },
          {
            value: "dropdown",
            label: "Dropdown"
          },
          {
            value: "steps",
            label: "Steps"
          }
        ]
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog"
          },
          {
            value: "tooltip",
            label: "Tooltip"
          },
          {
            value: "popover",
            label: "Popover"
          },
          {
            value: "card",
            label: "Card"
          },
          {
            value: "carousel",
            label: "Carousel"
          },
          {
            value: "collapse",
            label: "Collapse"
          }
        ]
      }
    ]
  },
  {
    value: "resource",
    label: "Resource",
    children: [
      {
        value: "axure",
        label: "Axure Components"
      },
      {
        value: "sketch",
        label: "Sketch Templates"
      },
      {
        value: "docs",
        label: "Design Documentation"
      }
    ]
  }
];
import { ElMessage, type UploadProps } from "element-plus";

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
</script>
<template>
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
          v-model="goods.categoryId"
          class="w-64"
          :options="options"
          :props="props"
          @change="handleChange"
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
          商品价格
        </p>
        <div class="w-64">
          <el-input
            v-model="goods.price"
            type="number"
            class="w-64"
            placeholder="请输入商品价格"
          />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <p class="text-xs before:content-['*'] before:text-rose-600">
          商品封面
        </p>
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
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
        <div class="w-64">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
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
    <div class="m-3 p-2 pl-32 flex flex-col gap-4">
      <editor />
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
