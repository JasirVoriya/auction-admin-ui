<script setup lang="ts">
import Line from "./components/Line.vue";
import Line2 from "./components/Line2.vue";
import Line3 from "./components/Line3.vue";
import { ref } from "vue";
import BaseInfo from "./components/BaseInfo.vue";
import Summary from "./components/Summary.vue";


defineOptions({
  name: "Welcome"
});
const loading = ref<boolean>(true);

setTimeout(() => {
  loading.value = !loading.value;
}, 800);
</script>

<template>
  <div>
    <el-row :gutter="24">
      <el-col
        v-motion
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="mb-[18px]"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <BaseInfo />
      </el-col>
      <el-col
        v-motion
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="mb-[18px]"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <Summary />
      </el-col>

      <el-col
        v-motion
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="mb-[18px]"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <Line />
      </el-col>

      <el-col
        v-motion
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="mb-[18px]"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <Line2 />
      </el-col>

      <el-col
        v-motion
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="mb-[18px]"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <Line3 />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
