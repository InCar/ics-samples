/**
 *  描述：Global filters js
 */
import tool from "@/js/core/utils/tool";

// 待安装
const install = Vue => {
  // 时间filter
  Vue.filter("formatTime", function(value) {
    if (!value) return "";
    let val = new Date(+value);
    return tool.DateFormat(val, "yyyy-MM-dd hh:mm:ss");
  });

  Vue.filter("formatDate", function(value) {
    if (!value) return "";
    let val = new Date(+value);
    return tool.DateFormat(val, "yyyy-MM-dd");
  });
};

export default install;
