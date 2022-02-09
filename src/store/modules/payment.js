import axios from "axios";

export default {
  namespaced: true,
  state: {
    payment: [],
  },
  mutations: {
    SET_PAYMENT(state, data) {
        state.payment = data;
    },
  },
  actions: {
    async fetchPayment({commit}) {
        const response = await axios.get(`resources/payments`);
        console.log(response.data);
        commit('SET_PAYMENT', response.data);
    },
  }
};
