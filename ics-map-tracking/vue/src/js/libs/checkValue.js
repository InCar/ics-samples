/**
 * 描述：验证模式基于element-ui
 */
const options = {
  number: /^[1-9]\d*$/,
  number13: /^[1-9]\d{12}$/,
  zeroNumber: /^[0-9]\d*$/,
  string: /[\w+-]/,
  phone: /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/, // 定义手机phone的正则表达式
  mima: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  pwd: /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9].{5,17}$/,
  noChinese: /^\w+$/, // 由数字、26个英文字母或者下划线组成的字符串
  vin: /^(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{17}$/, // vin
  license: /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5,6}$/, // 车牌号 新能源车会有6位
  licenseNo: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, // 驾驶证号码
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/, // 邮箱
  telPhone: /^(0\d{2,3}-?\d{7,8}|\d{6,12})$/, // 座机
  zipCode: /^[1-9][0-9]{5}$/, // 邮编
  positivePointNumber: /^[0-9]+([.]{1}[0-9]{0,3})?$/, // 正浮点数 3位小数
  floatNumber: /^[0-9]+([.]{1}[0-9]{0,2})?$/, // 正浮点数 2位小数
  stringNumber: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, // 中文字母数字
  vehicleModel: /^[a-zA-Z0-9\u4e00-\u9fa5-.]+$/, // 中文字母数字-
  numberLetter: /^[a-zA-Z0-9]+$/, // 字母数字
  numberLetterCross: /^[a-zA-Z0-9-]+$/, // 字母数字-
  ip: /^\d+\.\d+\.\d+\.\d+$/, // ip
  ip3: /^\d{3}\.\d{3}\.\d{3}\.\d{3}$/ // ip3
};

// 是否未定义
const isUndef = v => {
  return v === undefined || v === null;
};

// 是否为空
export const isEmpty = v => {
  return isUndef(v) || v === "";
};

// 导出模式
export const handles = (res, msg, status, config) => {
  config = config || {};
  let delay = config.delay || 1000;
  let timer = null;
  return (rule, value, callback) => {
    let remote = rule.remote || false;
    if (isEmpty(value) && !status) {
      callback(new Error(`请输入${msg}`));
    } else {
      if (rule.trigger.toLowerCase() === "change") {
        if (timer) {
          clearTimeout(timer);
          timer = null; // 提高效率
        }
        // 远程
        if (remote) {
          if (!config.service) throw new Error("参数有问题");
          timer = setTimeout(async () => {
            try {
              if (!options[res].test(value)) {
                callback(new Error(`${msg}格式不正确`));
              } else {
                let id = config.id || "";
                let param = {
                  [config.props]: value,
                  id: id
                };
                let result = await config.service(param);
                if (result.result) {
                  callback();
                }
              }
            } catch (e) {
              callback(`${msg}重复`);
            }
          }, delay);
        } else {
          timer = setTimeout(() => {
            if (!options[res].test(value)) {
              callback(new Error(`${msg}格式不正确`));
            } else {
              callback();
            }
          }, delay);
        }
      } else {
        if (!options[res].test(value) && !isEmpty(value)) {
          callback(new Error(`${msg}格式不正确`));
        } else {
          callback();
        }
      }
    }
  };
};
