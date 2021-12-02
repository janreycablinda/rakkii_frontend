import axios from "axios";

export default {
  namespaced: true,
  state: {
    job_orders: null,
  },
  mutations: {
    SET_JOB_ORDER(state, data) {
        state.job_orders = data;
    },
  },
  actions: {
    async fetchJobOrder({commit}) {
        const response = await axios.get(`resources/job_orders`);

        commit('SET_JOB_ORDER', response.data);
    },
  }
};
