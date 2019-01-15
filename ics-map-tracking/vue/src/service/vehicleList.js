// 导入baseService
import { baseService } from "@/service/baseService";

// 车辆列表
const vehicleList = "/api/sample/ics/vehicle/list"; // 车辆列表


/**
 * 车辆列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicle = (opt, fnSuccess, fnFail) => {
  baseService("get", vehicleList, fnSuccess, fnFail, opt);
};

