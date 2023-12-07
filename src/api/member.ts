import { request, Method } from "@/plugins/request";
/**
 * @description 分页获取所有用户
 * @param {number} page - 页码
 * @param {number} size - 每页记录数
 */
export const getAllUser = (page: number, size: number) => {
  const url = "/user/all";
  const method = Method.GET;
  const params = { page, size };
  return request({ url, method, params });
};