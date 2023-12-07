<template>
  <div class="flex gap-5">
    <el-card class="flex-2" shadow="never">
      <div class="flex justify-center font-bold py-3 text-xl text-gray-600">
        <span>当前在线人数</span>
      </div>
      <div class="flex justify-center text-4xl font-bold text-orange-400">
        <span>3</span>
      </div>
    </el-card>
    <el-card class="flex-1" shadow="never">
      <div class="font-bold py-3 text-xl text-gray-600">
        <span>流量概括</span>
      </div>
      <el-card shadow="never">
        <div class="flex justify-around">
          <div class="flex flex-col justify-center items-center">
            <span class="font-bold py-3 text-xl text-gray-600">今日访客数</span>
            <span class="text-xl font-bold text-orange-400">117</span>
          </div>
          <div class="flex flex-col justify-center items-center">
            <span class="font-bold py-3 text-xl text-gray-600">昨日访客数</span>
            <span class="text-xl font-bold text-orange-400">125</span>
          </div>
        </div>
      </el-card>
      <div class="flex gap-5 pt-5">
        <div
          class="flex flex-1 flex-col justify-center items-center rounded-md shadow-md"
        >
          <span class="font-bold py-3 text-sm text-gray-600">前七日访客数</span>
          <span class="text-xl font-bold text-orange-400">117</span>
        </div>
        <div
          class="flex flex-1 flex-col justify-center items-center rounded-md shadow-md"
        >
          <span class="font-bold py-3 text-sm text-gray-600"
            >前三十日访客数</span
          >
          <span class="text-xl font-bold text-orange-400">2341</span>
        </div>
      </div>
    </el-card>
    <el-card class="flex-1" shadow="never">
      <div class="font-bold py-3 text-xl text-gray-600">
        <span>今日概括</span>
      </div>
      <div class="grid grid-cols-3 gap-5">
        <div class="flex flex-col p-5 bg-gray-200 rounded-md">
          <span class="font-bold py-3 text-sm text-gray-600">今日订单数</span>
          <span class="text-xl font-bold text-rose-400">117</span>
        </div>
        <div class="flex flex-col p-5 bg-gray-200 rounded-md">
          <span class="font-bold py-3 text-sm text-gray-600">今日交易额</span>
          <span class="text-xl font-bold text-rose-400">￥117,142</span>
        </div>
        <div class="flex flex-col p-5 bg-gray-200 rounded-md">
          <span class="font-bold py-3 text-sm text-gray-600">今日新增店铺</span>
          <span class="text-xl font-bold text-rose-400">0</span>
        </div>
        <div class="flex flex-col p-5 bg-gray-200 rounded-md">
          <span class="font-bold py-3 text-sm text-gray-600">今日新增会员数</span>
          <span class="text-xl font-bold text-rose-400">1</span>
        </div>
        <div class="flex flex-col p-5 bg-gray-200 rounded-md">
          <span class="font-bold py-3 text-sm text-gray-600">今日上架拍品数</span>
          <span class="text-xl font-bold text-rose-400">2</span>
        </div>
        <div class="flex flex-col p-5 bg-gray-200 rounded-md">
          <span class="font-bold py-3 text-sm text-gray-600">今日成交订单数</span>
          <span class="text-xl font-bold text-rose-400">5</span>
        </div>
      </div>
    </el-card>
  </div>
</template>
