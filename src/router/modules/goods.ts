// 最简代码，也就是这些字段必须有
export default {
  path: "/goods",
  meta: {
    title: "商品"
  },
  children: [
    {
      path: "/goods/list/index",
      name: "GoodsList",
      component: () => import("@/views/goods/list/index.vue"),
      meta: {
        title: "平台商品"
      }
    },
    {
      path: "/goods/category/index",
      name: "GoodsCategory",
      component: () => import("@/views/goods/category/index.vue"),
      meta: {
        title: "商品分类"
      }
    },
    {
      path: "/goods/post/index",
      name: "GoodsPost",
      component: () => import("@/views/goods/post/index.vue"),
      meta: {
        title: "商品发布"
      }
    }
  ]
} as RouteConfigsTable;
