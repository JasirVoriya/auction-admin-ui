<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { type Ref, ref, computed } from "vue";
import { useDark, useECharts, type EchartOptions } from "@pureadmin/utils";

const { isDark } = useDark();

let theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "default";
});

const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions, getInstance } = useECharts(
  chartRef as Ref<HTMLDivElement>,
  { theme }
);

let xData = (() => {
  let data: any[] = [];
  for (let i = 1; i < 31; i++) {
    data.push(`${i}日`);
  }
  return data;
})();

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      borderWidth: 0,
      top: 110,
      bottom: 95
    },
    legend: {
      textStyle: {
        color: "#90979c"
      },
      data: ["交易额"]
    },
    calculable: true,
    xAxis: [
      {
        triggerEvent: true,
        type: "category",
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: xData
      }
    ],
    yAxis: [
      {
        triggerEvent: true,
        type: "value",
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: "slider",
        show: false,
        realtime: true,
        startValue: 0,
        endValue: 24
      }
    ],
    series: [
      {
        name: "交易额",
        type: "line",
        smooth: true,
        label: {
          show: true,
          position: "top"
        },
        areaStyle: {
          color: "rgba(214,245,233,1)",
          opacity: 0.5
        },
        symbolSize: 10,
        symbol: "circle",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117, 2000,
          1455, 1210, 719, 733, 944, 2285, 2208, 3372, 3936, 3693, 2962, 2810,
          3519, 2455, 2610, 2719, 2484, 2078
        ]
      }
    ],
    addTooltip: true
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  },
  {
    name: "contextmenu",
    callback: params => {
      console.log("contextmenu", params);
    }
  },
  // 点击空白处
  {
    type: "zrender",
    name: "click",
    callback: params => {
      console.log("点击空白处", params);
    }
  }
);
</script>

<template>
  <el-card shadow="never">
    <div class="flex justify-center font-bold pl-10 py-3 text-xl text-gray-600">
      <span>交易走势</span>
    </div>
    <div ref="chartRef" style="width: 100%; height: 60vh" />
  </el-card>
</template>
