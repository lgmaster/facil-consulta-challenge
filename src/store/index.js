import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    step: 1,
    formData: {},
  },
  getters: {
    getActiveStep(state) {
      return state.step;
    },
    getFormData(state) {
      return state.formData.data;
    },
  },
  mutations: {
    incrementStep(state) {
      state.step += 1;
    },
    saveFormData(state, data) {
      state.formData = { ...state.formData, data };
    },
  },
  actions: {
  },
  modules: {
  },
});
