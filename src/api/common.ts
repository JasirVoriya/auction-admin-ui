import { request, Method } from "@/plugins/request";
/**
 * @description 发送登录/注册验证码
 * @param {String} email 邮箱
 */
export const sendLoginCode = (email:String) => {
  return request({
    url: `email/login/${email}`,
    method: Method.GET,
  })
}
/**
 * @description 发送修改密码验证码
 * @param {String} email 邮箱
 */
export const sendChangePasswordCode = (email:String) => {
  return request({
    url: `email/password/${email}`,
    method: Method.GET,
  })
}
/**
 * @description 发送修改邮箱验证码
 */
export const sendChangeEmailCode = (email:String) => {
  return request({
    url: `email/email/${email}`,
    method: Method.GET,
  })
}
/**
 * @description 文件上传
 */
export const uploadFile = (data:FormData) => {
  return request({
    url: 'file/upload',
    method: Method.POST,
    data,
    needToken: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
/**
 * @description 获取文件
 */
export const getFile = (id:String) => {
  return request({
    url: `file/download/${id}`,
    method: Method.GET,
  })
}