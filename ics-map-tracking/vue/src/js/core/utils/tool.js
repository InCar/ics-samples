/**
 * 设置cookie 天
 */
const setCookie = (name, value, day) => {
  let exp = new Date();
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

/**
 * 设置cookie 分钟
 */
const setCookieM = (name, value, time) => {
  let exp = new Date();
  exp.setTime(time);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

/**
 * 获取cookie
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
const getCookie = name => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + "=");
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(";", start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
};

/**
 * 删除cookie
 * @param name
 * @returns {string}
 */
const deleteCookie = name => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval !== null) {
    document.cookie = name + "=" + cval + ";expires = " + exp.toGMTString();
  }
  return "";
};

/**
 * 存储localStorage/sessionStorage
 */
const setStore = (name, content, deep) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  if (deep) {
    window.localStorage.setItem(name, content);
  } else {
    window.sessionStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage/sessionStorage
 */
const getStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    return window.localStorage.getItem(name);
  } else {
    return window.sessionStorage.getItem(name);
  }
};

/**
 * 删除localStorage/sessionStorage
 */
const removeStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    window.localStorage.removeItem(name);
  } else {
    window.sessionStorage.removeItem(name);
  }
};

const MillisecondToDate = msd => {
  var time = parseFloat(msd) / 1000;
  if (time !== null && time !== "") {
    if (time > 60 && time < 60 * 60) {
      let m = parseInt(time / 60.0);
      let s = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
      if (s === 0) {
        time = m + "分";
      } else {
        time = m + "分" + s + "秒";
      }
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      let h = parseInt(time / 3600.0);
      let s = parseInt(
        (parseFloat(
          (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
        ) -
          parseInt(
            (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
          )) *
          60
      );
      let m = parseInt(
        (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
      );
      if (s === 0 && m === 0) {
        time = h + "时";
      } else if (s === 0) {
        time = h + "时" + m + "分";
      } else {
        time = h + "时" + m + "分" + s + "秒";
      }
    } else if (time >= 60 * 60 * 24) {
      let d = parseInt(time / 3600.0 / 24);
      let h = parseInt(
        (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24
      );
      let m = parseInt(
        (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
      );
      let s = parseInt(
        (parseFloat(
          (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
        ) -
          parseInt(
            (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
          )) *
          60
      );
      if (s === 0 && m === 0 && h === 0) {
        time = d + "天";
      } else if (s === 0 && m === 0) {
        time = d + "天" + h + "时";
      } else if (s === 0) {
        time = d + "天" + h + "时" + m + "分";
      } else {
        time = d + "天" + h + "时" + m + "分" + s + "秒";
      }
    } else {
      time = parseInt(time) + "秒";
    }
  } else {
    time = "0 时 0 分 0 秒";
  }
  return time;
};
/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormat = (str, fmt) => {
  let o = {
    "M+": str.getMonth() + 1,
    "d+": str.getDate(),
    "h+": str.getHours(),
    "m+": str.getMinutes(),
    "s+": str.getSeconds(),
    "q+": Math.floor((str.getMonth() + 3) / 3),
    S: str.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (str.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormatTZ = dateStr => {
  let time = new Date(dateStr).getTime();
  let date = DateFormat(
    new Date(time - 8 * 60 * 60 * 1000),
    "yyyy-MM-dd hh:mm:ss"
  );
  let dateTZ = new Date((date + ".000Z").replace(" ", "T"));
  return dateTZ;
};

// 函数节流
const throttle = (idea, action) => {
  let last = 0;
  return function() {
    let now = +new Date();
    if (now - last > idea) {
      action && action.apply(this, arguments);
      last = now;
    }
  };
};

// 函数防抖
const debounce = (idea, action) => {
  let timer = null;
  return function() {
    let that = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function() {
      action && action.apply(that, args);
    }, idea);
  };
};

// extend
const extend = (target, source) => {
  for (let attr in source) {
    target[attr] = source[attr];
  }
  return target;
};

const find = (array, cb) => {
  return array.filter(cb)[0];
};

// deepCopy
const deepCopy = (obj, cache = []) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
};

const createButton = (h, params, fn, text, props, style, defClass) => {
  let defProps =
    props ||
    {
      //  type: 'text',
      //  size: 'small'
    };
  let defStyle = style || {
    // marginRight: '5px',
    // color: '#19be6b'
    //  height: '22px !important',
    //  lineHeight: '22px !important',
    //  background: 'none ',
    //  border: 'none ',
    cursor: "pointer"
    //  padding: '0 8px !important'
  };
  let cls = defClass || "";
  return h(
    "Button",
    {
      props: defProps,
      style: defStyle,
      class: cls,
      on: {
        click: e => {
          fn(params.row, e);
        }
      }
    },
    text
  );
};
const createIcon = (h, params, fn, text, props, style) => {
  let defProps = props || {
    type: "text",
    size: "25"
  };
  let defStyle = style || {
    marginRight: "5px",
    cursor: "pointer"
    // color: '#19be6b'
  };
  return h(
    "new-icon",
    {
      props: defProps,
      style: defStyle,
      on: {
        click: () => {
          fn(params.row, params.index);
        }
      }
    },
    text
  );
};

let PI = 3.14159265358979324;
//  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
let delta = (lat, lon) => {
  // Krasovsky 1940
  //
  // a = 6378245.0, 1/f = 298.3
  // b = a * (1 - f)
  // ee = (a^2 - b^2) / a^2;
  let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
  let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  let radLat = (lat / 180.0) * PI;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  let sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI);
  return { lat: dLat, lon: dLon };
};

// GPS---高德
const converAmap = (wgsLat, wgsLon) => {
  if (outOfChina(wgsLat, wgsLon)) {
    return { lat: wgsLat, lon: wgsLon };
  }
  let d = delta(wgsLat, wgsLon);
  return { lat: wgsLat + d.lat, lon: wgsLon + d.lon };
};
let outOfChina = (lat, lon) => {
  if (lon < 72.004 || lon > 137.8347) {
    return true;
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true;
  }
  return false;
};
let transformLat = (x, y) => {
  let ret =
    -100.0 +
    2.0 * x +
    3.0 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x));
  ret +=
    ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
  ret +=
    ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
};
let transformLon = (x, y) => {
  let ret =
    300.0 +
    x +
    2.0 * y +
    0.1 * x * x +
    0.1 * x * y +
    0.1 * Math.sqrt(Math.abs(x));
  ret +=
    ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
  ret +=
    ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) *
      2.0) /
    3.0;
  return ret;
};

const createIconAndText = (h, params, props, min, max) => {
  let defProps = props || {
    type: "text",
    size: "25"
  };
  if (
    params.row[params.column.key] < min ||
    params.row[params.column.key] > max
  ) {
    return [
      h("hy-handler", {
        props: defProps,
        style: {
          marginRight: "3px"
        }
      }),
      h(
        "span",
        {
          style: {
            color: "red"
          }
        },
        params.row[params.column.key]
      )
    ];
  } else {
    return h("span", {}, params.row[params.column.key]);
  }
};

const tagStatus = (h, params, fn, bol) => {
  let row;
  if (bol) {
    row = params.row[params.column.key];
  } else {
    row = params.row[params.column.key];
  }
  if (row) {
    let list = [
      {
        value: !row.collectTime
          ? "未知"
          : DateFormat(new Date(row.collectTime), "yyyy-MM-dd hh:mm:ss"),
        label: "采集时间"
      },
      {
        value: !row.receiveTime
          ? "未知"
          : DateFormat(new Date(row.receiveTime), "yyyy-MM-dd hh:mm:ss"),
        label: "接收时间"
      }
    ];
    return [
      h(
        "Button",
        {
          props: {
            size: "small"
          },
          //  attrs: {class: 'mouseOn'},
          style: {
            marginRight: "5px",
            borderColor: "#5FC345",
            color: "#5FC345",
            backgroundColor: "#ffffff",
            //  backgroundImage: 'url(/static/images/can/normal.png)',
            //  backgroundRepeat: 'no-repeat',
            //  backgroundSize: 'cover',
            width: "40px",
            height: "29px",
            cursor: "pointer"
          },
          on: {
            click: () => {
              fn(params.row);
            }
          }
        },
        "正常"
      ),
      h(
        "div",
        {
          slot: "content"
        },
        [
          h(
            "ul",
            list.map(item => {
              return h(
                "li",
                {
                  style: {
                    textAlign: "left",
                    padding: "4px"
                  }
                },
                item.label + "：" + item.value
              );
            })
          )
        ]
      )
    ];
  } else {
    return [
      h(
        "Button",
        {
          props: {
            size: "small"
          },
          style: {
            marginRight: "5px",
            borderColor: "#94A3A9",
            color: "#94A3A9",
            backgroundColor: "#ffffff",
            //  backgroundImage: 'url(/static/images/can/nodata.png)',
            //  backgroundRepeat: 'no-repeat',
            //  backgroundSize: 'cover',
            width: "60px",
            height: "29px",
            cursor: "default"
          },
          on: {
            click: () => {
              fn(params.row);
            }
          }
        },
        "无数据"
      )
    ];
  }
};

const configure = h => {
  return h(
    "Button",
    {
      props: {
        size: "small"
      },
      style: {
        marginRight: "5px",
        borderColor: "#94A3A9",
        color: "#94A3A9",
        backgroundColor: "#ffffff",
        // backgroundImage: 'url(/static/images/can/nono.png)',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        width: "60px",
        height: "29px",
        cursor: "default"
      }
    },
    "无配置"
  );
};
// rotateTable
const rotateTable = (h, text) => {
  return h(
    "div",
    {
      class: "roTable roTableB",
      style: {}
    },
    [
      h(
        "div",
        {
          class: "under front",
          style: {}
        },
        [
          h(
            "p",
            {
              style: {}
            },
            text
          )
        ]
      ),
      h(
        "div",
        {
          class: "under back",
          style: {}
        },
        [
          h(
            "p",
            {
              style: {}
            },
            text
          )
        ]
      )
    ]
  );
};
/**
 * 是否存在数组里面
 * @param array
 * @param value
 */
const isInArray = (array, value) => {
  let ret = array.find(item => {
    return item.value === value;
  });
  if (ret) {
    return ret.value;
  }
  return "";
};
/**
 * 判断字符串是否是JSON
 * @param str
 * @returns {boolean}
 */
const isJSON = str => {
  if (typeof str === "string") {
    try {
      JSON.parse(str);
      if (str.indexOf("{") > -1) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};
/**
 * 是否存在数组中，存在则返回原来的数组，不存在则添加在原来的数组中
 * @param array
 * @param json
 * @returns {*}
 */
const isInSelectArray = (array, json) => {
  let ret = array.find(item => {
    return item.value === json.value;
  });
  if (ret) {
    return array;
  } else {
    array.push(json);
    return array;
  }
};

/**
 * 去重
 * @param array
 * @returns {Array}
 */
const deleteRepeat = array => {
  let res = [];
  let json = {};
  for (let i = 0; i < array.length; i++) {
    if (!json[array[i]]) {
      res.push(array[i]);
      json[array[i]] = 1;
    }
  }
  return res;
};

/**
 * 去重
 * @param array
 * @returns {Array}
 */
const deleteObject = (array, code, content) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (content) {
        if (
          array[i][code] === array[j][code] &&
          array[i][content] === array[j][content]
        ) {
          j = ++i;
        }
      } else {
        if (array[i][code] === array[j][code]) {
          j = ++i;
        }
      }
    }
    result.push(array[i]);
  }
  return result;
};

/**
 * 删除两个数组中的相同元素
 * @param a
 * @param b
 * @returns {*}
 */
const deleteTwoArrayRepeat = (a, b) => {
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (a[j] === b[i]) {
        a.splice(j, 1);
        j = j - 1;
      }
    }
  }
  return a;
};
/**
 * 在数组中
 * @param ele
 * @param targetArr
 * @returns {boolean}
 */
const oneOf = (ele, targetArr) => {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};
/**
 * 加密
 * @param code
 */
const compile = code => {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
};
/**
 * 解密
 * @param code
 * @returns {string}
 */
const uncompile = code => {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
};
const objectTrim = object => {
  for (let key in object) {
    // console.log(typeof object[key]);
    if (typeof object[key] === "string") {
      object[key] = object[key].trim();
    }
  }
};

// 抛出
export default {
  setCookie,
  setCookieM,
  getCookie,
  deleteCookie,
  setStore,
  getStore,
  removeStore,
  DateFormat,
  DateFormatTZ,
  throttle,
  debounce,
  extend,
  deepCopy,
  createButton,
  createIcon,
  tagStatus,
  isInArray,
  isJSON,
  isInSelectArray,
  deleteRepeat,
  deleteTwoArrayRepeat,
  oneOf,
  compile,
  uncompile,
  objectTrim,
  createIconAndText,
  converAmap,
  MillisecondToDate,
  configure,
  rotateTable,
  deleteObject
};
