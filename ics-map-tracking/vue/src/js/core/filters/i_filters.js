/**
 *  描述：Global filters js
 */
import tool from "@/js/core/utils/tool";

// 待安装
const install = Vue => {
  Vue.prototype.__filters = {
    // 时间
    formatTime: (h, params, key) => {
      if (!params.row[key]) {
        return "";
      }
      let val = new Date(+params.row[key]);
      let time = tool.DateFormat(val, "yyyy-MM-dd hh:mm:ss");
      return h("p", null, time);
    },
    // 日期
    formatDate: (h, params, key) => {
      if (!params.row[key]) {
        return "";
      }
      let val = new Date(+params.row[key]);
      let date = tool.DateFormat(val, "yyyy-MM-dd");
      return h("p", null, date);
    },
    // 评分周期
    RatingCycleFormat: (h, val) => {
      let strInfo = "";
      switch (val) {
        case 1:
          strInfo = "天";
          break;
        case 2:
          strInfo = "周";
          break;
        case 3:
          strInfo = "月";
          break;
        case 4:
          strInfo = "年";
          break;
        default:
          strInfo = "--";
          break;
      }
      return h("span", strInfo);
    }
  };
};

export default install;
