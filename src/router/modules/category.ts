// 最简代码，也就是这些字段必须有
export default {
  path: "/category",
  meta: {
    title: "商品分类"
  },
  children: [
    {
      path: "/category/judicial",
      name: "Judicial",
      component: () => import("@/views/category/Judicial.vue"),
      meta: {
        title: "司法资产"
      }
    },
    {
      path: "/category/rare-goods",
      name: "RareGoods",
      component: () => import("@/views/category/RareGoods.vue"),
      meta: {
        title: "民间珍品"
      }
    }
  ]
} as RouteConfigsTable;
