import { defineStore } from "pinia";

export const useMyUserStore = defineStore("user", {
  state: () => ({
    uuid: "",
    accessToken: "",
    refreshToken: "",
    userInfo: {} as any,
    postGoods: {
      categoryIds: [],
      goodsType: null,
      name: null,
      intro: null,
      cover: null,
      startingPrice: null,
      increment: null,
      deposit: null,
      startTime: null,
      endTime: null
    }
  }),
  actions: {
    logout() {
      this.accessToken = "";
      this.refreshToken = "";
      this.userInfo = {};
    },
    clearPostGoods() {
      this.postGoods = {
        categoryIds: [],
        goodsType: null,
        name: null,
        intro: null,
        cover: null,
        startingPrice: null,
        increment: null,
        deposit: null,
        startTime: null,
        endTime: null
      };
    }
  },
  getters: {
    isLogin: state => {
      return (
        state.accessToken !== "" &&
        state.refreshToken !== "" &&
        Object.keys(state.userInfo).length !== 0
      );
    }
  },
  persist: true
});
