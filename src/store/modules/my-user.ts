import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    uuid: "",
    accessToken: "",
    refreshToken: "",
    userInfo: {} as any
  }),
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
