//品牌管理模块的接口
import request from "@/utils/request.ts";
import {
  TradeMark,
  TradeMarkResponseData,
} from "@/api/product/trademark/type.ts";

//接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  //添加品牌
  ADD_TRADEMARK_URL = "/admin/product/baseTrademark/save",
  //修改品牌
  UPDATE_TRADEMARK_URL = "/admin/product/baseTrademark/update",
}

//获取已有品牌的接口方法
//page获取第几页的数据
//limit获取几个数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  );

//添加与修改已有品牌的方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //修改已有品牌的数据
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  } else {
    //新增品牌
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data);
  }
};
