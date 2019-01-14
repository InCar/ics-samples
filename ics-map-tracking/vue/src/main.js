import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import routes from "./router/router";
import store from "./store/";
import core from "@/js/core";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(core);

const router = new VueRouter({
  mode: "history",
  routes,
  strict: process.env.NODE_ENV !== "production"
});

// 路由未登录拦截
router.beforeEach((to, from, next) => {
  let info = Vue._hyTool.getStore("loginInfo", true);
  if (to.path !== "/login" && !info) {
    next();
  } else {
    next();
  }
});
Vue.prototype.$bus = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
