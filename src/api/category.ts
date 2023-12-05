import { request, Method } from "@/plugins/request";

/**
 * @description 添加分类
 */
export const addCategory = (categoryVO: any) => {
  return request({
    url: `/category`,
    method: Method.POST,
    data: categoryVO
  });
};
/**
 * @description 删除分类
 */
export const deleteCategory = (id: String) =>
  request({
    url: `/category/${id}`,
    method: Method.DELETE
  });

/**
 * @description 修改分类
 */
export const updateCategory = (data: any) =>
  request({
    url: `/category/${data.id}`,
    method: Method.PUT,
    data
  });
/**
 * @description 查询单个分类
 */
export const getCategory = (id: String) =>
  request({
    url: `/category/${id}`,
    method: Method.GET
  });

/**
 * @description 查询顶级分类
 */
export const getTopCategory = () =>
  request({
    url: "/category",
    method: Method.GET
  });
/**
 * @description 查询所有分类
 */
export const getAllCategory = () =>
  request({
    url: "/category/all",
    method: Method.GET
  });
/**
 * @description 查询子分类
 * @param {String} parentId - 父分类的 ID
 */
export const getChildrenCategory = (parentId: String) =>
  request({
    url: `/category/${parentId}/children`,
    method: Method.GET
  });
