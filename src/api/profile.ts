import { request, Method } from "@/plugins/request";
/**
 * @description 获取当前登录用户信息
 */
export const getUserProfile = () => {
    return request({
        url: `profile/info`,
        method: Method.GET,
        needToken: true
    });
}
/**
 * @description 更新当前登录用户头像
 */
export const updateUserAvatar = (data: any) => {
    return request({
        url: `profile/info/avatar`,
        method: Method.PUT,
        needToken: true,
        data
    });
}
/**
 * @description 更新当前登录用户性别
 */
export const updateUserSex = (data: any) => {
    return request({
        url: `profile/info/sex`,
        method: Method.PUT,
        needToken: true,
        data
    });
}