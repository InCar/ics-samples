// 导入baseService
import { baseService } from "@/service/baseService";

// 省份 城市 地区
const listProvinceApi = "/api/area/provinceList"; // 省份列表
const listAreaApi = "/api/area/getAreaList/{parentId}"; // 城市列表
const getAreaApi = "/api/area/{id}"; // 地区列表

/**
 * 省份列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const provinceList = (opt, fnSuccess, fnFail) => {
  baseService("get", listProvinceApi, fnSuccess, fnFail, opt);
};

/**
 * 地区列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const areaList = (opt, fnSuccess, fnFail) => {
  baseService("get", listAreaApi, fnSuccess, fnFail, opt);
};

/**
 * 地区详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const getArea = (opt, fnSuccess, fnFail) => {
  baseService("get", getAreaApi, fnSuccess, fnFail, opt);
};
