import axios from "axios";

export default {
  namespaced: true,
  state: {
    payment: [],
    weekly_payments: [],
    payment_list: []
  },
  mutations: {
    SET_PAYMENT(state, data) {
        state.payment = data;
    },
    SET_PAYMENT_LIST(state, data) {
        state.payment_list = data;
    },
    REMOVE_PAYMENT_LIST(state, id) {
      let items = state.payment_list.filter(item => item.id != id);
      state.payment_list = items;
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
    async fetchPaymentList({commit}) {
        const response = await axios.get(`resources/payment_list`);
        console.log(response.data);
        commit('SET_PAYMENT_LIST', response.data);
    },
    async deletePayment({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_payment/${data.id}/${data.billing_statement_id}`).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});

            commit('billing/UPDATE_BILLING', response.data, {root:true});
            resolve(data.id);
          }, error => {
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});

            reject(error);
          });
      })
    },
  }
};
