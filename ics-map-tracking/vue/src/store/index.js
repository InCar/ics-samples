import Vuex from "vuex";
import state from "@/store/src/state";
import mutations from "@/store/src/mutations";

export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== "production"
});
