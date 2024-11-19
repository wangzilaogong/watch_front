import { Post, Get, Delete } from '../utils/http/request.js'
const server = import.meta.env.MODE === 'development' ? '' : ''
//查询订单列表接⼝
export const getOrderlist = (data) => { return Get("/v1/order/list", data) };
//获取邀请关系接⼝
export const getRelationship = (data) => { return Get("/v1/invite/relationship", data) };
//更新订单地址接⼝
export const updateAddress = (data) => { return Post("/v1/order/address/update", data) };