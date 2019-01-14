// 封装axios
import Vue from "vue";

// 定义快捷请求方式
const methodList = {
  opt: ["get", "head"],
  payload: ["save", "update", "patch", "delete"]
};

// 常用配置
const defaultMethod = {
  get: "get",
  delete: "delete",
  head: "head",
  save: "post",
  update: "put",
  patch: "patch"
};

// baseSer
const baseSer = (method, url, options) => {
  let config = {
    method: defaultMethod[method.toLowerCase()] || "get"
  };
  if (options) {
    config = Object.assign(config, options);
  }
  let res = Vue.$http(url, config);
  return res;
};
// join params
const joinParams = (url, params) => {
  if (params) {
    let propertys = Object.keys(params);
    propertys.forEach(key => {
      url = url.replace(new RegExp("{" + key + "}", "g"), params[key]);
    });
  }
  return url;
};
// 401 404
const logoutHtml = response => {
  if (response.code === "401") {
    // 登录权限
    // setTimeout(() => {
    window.location.href = "/login";
    window.localStorage.removeItem("loginInfo");
    window.localStorage.removeItem("permission");
    window.localStorage.removeItem("menuTree");
    //  }, 1000);
    // } else if (response.code === '404') {   // 资源权限
    //   setTimeout(() => {
    //     window.location.href = '/404';
    //   }, 1000);
  }
};
// 导出service
export const baseService = (method, url, fnSuccess, fnFail, opt, payload) => {
  if (methodList.opt.some(item => item === method)) {
    // 拼接参数
    if (method === "get") {
      url = joinParams(url, opt);
    }
    baseSer(method, url, { params: opt, data: payload })
      .then(response => {
        response = response.data;
        if (response.result) {
          fnSuccess && fnSuccess(response.data);
        } else {
          fnFail && fnFail(response.message, response.error);
        }
        logoutHtml(response);
      })
      .catch(function(ret) {
        if (ret.response === undefined) fnFail;
        else fnFail && fnFail(ret.response.data.message);
      });
  } else if (methodList.payload.some(item => item === method)) {
    url = joinParams(url, opt);
    baseSer(method, url, { params: opt, data: payload })
      .then(response => {
        response = response.data;
        if (response.result) {
          fnSuccess && fnSuccess(response.data);
        } else {
          fnFail && fnFail(response.message, response.error);
        }
        logoutHtml(response);
      })
      .catch(function(ret) {
        if (ret.response === undefined) fnFail;
        else fnFail && fnFail(ret.response.data.message);
      });
  }
};

// 格式化url
export const formateUrl = (str, reg) => {
  return str.replace(/\{(\w+)\}/g, (res, $1) => {
    return reg[$1];
  });
};
