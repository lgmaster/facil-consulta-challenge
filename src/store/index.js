import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    step: 1,
  },
  getters: {
    getActiveStep(state) {
      return state.step;
    },
  },
  mutations: {
    incrementStep(state) {
      state.step += 1;
    },
  },
  actions: {
  },
  modules: {
  },
});
