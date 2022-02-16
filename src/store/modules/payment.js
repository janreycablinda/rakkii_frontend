import axios from "axios";

export default {
  namespaced: true,
  state: {
    payment: [],
    weekly_payments: []
  },
  mutations: {
    SET_PAYMENT(state, data) {
        state.payment = data;
    },
    SET_WEEKLY_PAYMENT(state, data) {
      state.weekly_payments = data;
  },
  },
  actions: {
    async fetchPayment({commit}) {
        const response = await axios.get(`resources/payments`);
        console.log(response.data);
        commit('SET_PAYMENT', response.data);
    },
    async fetchWeeklyPayment({commit}) {
        const response = await axios.get(`resources/weekly_payment`);
        
        commit('SET_WEEKLY_PAYMENT', response.data);
    },
  }
};
