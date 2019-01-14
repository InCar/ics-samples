/**
 *  描述：基于vue的扩展
 */
import axios from "axios";

import _hyTool from "@/js/core/utils/tool"; // 全局方法
import _hyFilters from "@/js/core/filters/filters"; // 全局过滤文件
import __filters from "@/js/core/filters/i_filters"; // 全局过滤文件
import hyPage from "@/components/common/pageServices/pageServices"; // 分页组件
import newIcon from "@/components/common/icon/icon"; // icon
import hyHandler from "@/components/common/icon/handler"; // icon
// import hyButton from '@/components/common/button/button';                 // button

const install = Vue => {
  // 静态方法
  if (install.installed) return;
  install.installed = true;
  // axios
  Vue.prototype.$http = Vue.$http = Vue.prototype.$http || axios;
  // 全局方法
  Vue.prototype._hyTool = Vue._hyTool = Vue.prototype._hyTool || _hyTool;
  // 过滤ue.com
  Vue.use(_hyFilters);
  // iview table字段过滤
  Vue.use(__filters);
  // 组件
  Vue.component("hyPage", hyPage);
  Vue.component("newIcon", newIcon);
  Vue.component("hyHandler", hyHandler);
  // Vue.component('hyButton', hyButton);
};

// axios拦截器设置cookie
axios.interceptors.request.use(
  config => {
    if (config.params) {
      config.params.timestamp = new Date().getTime();
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http响应拦截器
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    let response = data.data;
    if (response.code === "401") {
      window.location.href = "/login";
      window.localStorage.removeItem("loginInfo");
    }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

// 工具类
const core = {
  install
};

/**
 * 自动安装控件
 */
let GlobalVue = null;
if (window.Vue !== undefined) {
  GlobalVue = window.Vue;
} else if (global.Vue !== undefined) {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(core);
}

export default core;
