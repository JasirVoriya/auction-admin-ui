import { request, Method } from "@/plugins/request";
/**
 * @description 密码登录
 * @param {String} account 账号
 * @param {String} password 密码
 */
export const passwordLogin = (account: String, password: String) => {
  return request({
    url: `passport/login/password`,
    method: Method.POST,
    data: {
      account,
      password
    }
  })
}
/**
 * @description 验证码登录
 * @param {String} email 邮箱
 * @param {String} code 验证码
 */
export const codeLogin = (email: String, code: String) => {
  return request({
    url: `passport/login/code`,
    method: Method.POST,
    data: {
      email,
      code
    }
  })
}
/**
 * @description 退出登录
 */
export const logout = () => {
  return request({
    url: `passport/logout`,
    method: Method.POST,
    needToken: true
  })
}
/**
 * @description 验证码修改密码
 */
export const changePassword = (email: String, code: String, password: String) => {
  return request({
    url: `passport/password`,
    method: Method.PUT,
    data: {
      email,
      code,
      password
    }
  })
}
/**
 * @description 修改邮箱
 */
export const changeEmail = (email: String, code: String) => {
  return request({
    url: `passport/email`,
    method: Method.PUT,
    needToken: true,
    data: {
      email,
      code
    }
  })
}
/**
 * @description 修改用户名
 */
export const changeUsername = (username: String) => {
  return request({
    url: `passport/username`,
    method: Method.PUT,
    needToken: true,
    data: {
      username
    }
  })
}
