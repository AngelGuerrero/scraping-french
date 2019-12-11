import Vue from "vue";
import Vuex from "vuex";
//
// Modules
import scrapping from "./modules/scrapping";
import common from "./modules/common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  modules: {
    scrapping,
    common
  }
});
