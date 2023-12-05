import { defineStore } from "pinia";
import { store } from "@/store";
import type { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageLocal } from "@pureadmin/utils";
// import { getLogin, refreshTokenApi } from "@/api/user";
import type { UserResult, RefreshTokenResult } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";

import * as passportApi from "@/api/passport";
import * as profileApi from "@/api/profile";
//导入我自己的userStore
import { useMyUserStore } from "@/store/modules/my-user";
import { addPathMatch } from "@/router/utils";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { message } from "@/utils/message";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0,
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(account: String, password: String) {
      passportApi.passwordLogin(account, password).then(res => {
        console.log(res);
        // 按照框架的逻辑，构建一个UserResult对象
        const data = {
          success: false,
          data: {
            accessToken: "",
            refreshToken: "",
            username: "",
            roles: []
          }
        } as UserResult;
        data.success = true;
        data.data.accessToken = res.accessToken;
        data.data.refreshToken = res.refreshToken;
        //按照我的逻辑，存储token
        useMyUserStore().accessToken = res.accessToken;
        useMyUserStore().refreshToken = res.refreshToken;
        //获取用户信息
        profileApi.getUserProfile().then(res => {
          data.data.username = res.username;
          data.data.roles = ['admin'];
          setToken(data.data);
          //按照我的逻辑，存储用户信息
          useMyUserStore().userInfo = res;
          // 全部采取静态路由模式
          usePermissionStoreHook().handleWholeMenus([]);
          addPathMatch();
          router.push("/");
          message("登录成功", { type: "success" });
        });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      //按照我的逻辑，清除token和用户信息
      useMyUserStore().logout();
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        // refreshTokenApi(data)
        //   .then(data => {
        //     if (data) {
        //       setToken(data.data);
        //       resolve(data);
        //     }
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
