const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const pathURL = "http://127.0.0.1:8889";
module.exports = {
  baseUrl: "/",
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  configureWebpack: {
    externals: {
      AMap: "AMap",
      Maptrack: "Maptrack", //需要写入暴露出来的方法
      AMapUI: "AMapUI",
      echarts: "echarts",
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      moment: "moment",
      "element-ui": "ELEMENT",
      iview: "iview",
      axios: "axios"
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/components/common"))
      .set("header", resolve("src/components/header"))
      .set("thermometer", resolve("src/components/thermometer"))
      .set("mixins", resolve("src/js/mixins"))
      .set("bigPage", resolve("src/components/bigPage"))
      .set("service", resolve("src/service"));
  },
  devServer: {
    port: 8085,
    https: false,
    open: true,
   /* proxy: pathURL*/
    proxy: {
      "/api": {
        target: pathURL,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
