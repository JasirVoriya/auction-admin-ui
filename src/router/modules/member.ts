// 最简代码，也就是这些字段必须有
export default {
  path: "/member",
  meta: {
    title: "会员管理"
  },
  children: [
    {
      path: "/member/list/index",
      name: "MemberList",
      component: () => import("@/views/member/list/index.vue"),
      meta: {
        title: "会员列表"
      }
    },
    {
      path: "/member/recycle/index",
      name: "MemberRecycle",
      component: () => import("@/views/member/recycle/index.vue"),
      meta: {
        title: "回收站"
      }
    }
  ]
} as RouteConfigsTable;
