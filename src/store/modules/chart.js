import axios from "axios";

export default {
  namespaced: true,
  state: {
    cash_collected: [],
    cash_collectables: []
  },
  mutations: {
    SET_CASH_COLLECTED(state, data) {
        state.cash_collected = data;
    },
    SET_CASH_COLLECTABLES(state, data) {
      state.cash_collectables = data;
    },
  },
  actions: {
    async fetchCashCollected({commit}) {
        const response = await axios.get(`resources/cash_collected`);
        console.log(response);
        commit('SET_CASH_COLLECTED', response.data);
    },
    async fetchCashCollectables({commit}) {
      const response = await axios.get(`resources/cash_collectables`);
      console.log(response.data);
      commit('SET_CASH_COLLECTABLES', response.data);
    },
  }
};
