import { request, Method } from "@/plugins/request";

/**
 * @description 添加商品
 * @param {GoodsVO} goodsVO - 商品信息
 */
export const addGoods = (goodsVO: any) => {
  const url = "/goods";
  const method = Method.POST;
  const data = goodsVO;
  return request({ url, method, data, needToken: true });
};

/**
 * @description 删除商品
 * @param {String} id - 商品ID
 */
export const deleteGoods = (id: String) =>
  request({
    url: `/goods/${id}`,
    method: Method.DELETE,
    needToken: true,
  });

/**
 * @description 修改商品
 * @param {any} data - 商品信息
 */
export const updateGoods = (data: any) =>
  request({
    url: `/goods/${data.id}`,
    method: Method.PUT,
    data,
    needToken: true,
  });

/**
 * @description 查询单个商品
 * @param {String} id - 商品ID
 */
export const getGoods = (id: String) =>
  request({
    url: `/goods/${id}`,
    method: Method.GET,
  });

/**
 * @description 查询商品列表
 * @param {Number} page - 页码
 * @param {Number} size - 每页记录数
 */
export const getGoodsList = (page: Number, size: Number) =>
  request({
    url: "/goods",
    method: Method.GET,
    params: { page, size },
  });
