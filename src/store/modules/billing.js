import axios from "axios";

export default {
  namespaced: true,
  state: {
    billings: [],
    billing_no: 0
  },
  mutations: {
    SET_BILLING(state, data) {
        state.billings = data;
    },
    SET_BILLING_NO(state, data) {
        state.billing_no = data;
    },
    UPDATE_BILLING(state, data) {
        const index = state.billings.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.billings.splice(index, 1, data);
        }
    },
    NEW_BILLING(state, data) {
        let items = state.billings.concat(data);
        state.billings = items;
    },
    REMOVE_BILLING(state, id) {
      let items = state.billings.filter(item => item.id != id);
      state.billings = items;
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
    async fetchBilling({commit}) {
        const response = await axios.get(`resources/get_billing_statement`);
        
        commit('SET_BILLING', response.data);
    },

    async fetchBillingNo({commit}) {
        const response = await axios.get(`resources/get_billing_statement_no`);
        
        commit('SET_BILLING_NO', response.data);
    },
    
    async findBillingStatement({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`resources/find_billings/${id}`).then(response => {
          resolve(response.data);
        }, error => {
          reject(error);
        });
      });
    },

    async addBilling({commit, dispatch}, data) {
        await axios.post("resources/create_billing", {
            job_order_id: data.job_order_id,
            billed_to: data.billed_to,
            tin: data.tin,
            address: data.address,
            date: data.date,
            plate_no: data.plate_no,
            ref_claim_no: data.ref_claim_no,
            buss_style: data.buss_style,
            payment_for: data.payment_for,
            billing_details: data.payment_details,
            total_amount: data.total_amount
        }).then(response => {
            console.log(response.data);
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            // commit('NEW_AGENT', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },

    async updateBilling({commit, dispatch}, data) {
      await axios.post("resources/create_billing", {
          job_order_id: data.job_order_id,
          billed_to: data.billed_to,
          tin: data.tin,
          address: data.address,
          date: data.date,
          plate_no: data.plate_no,
          ref_claim_no: data.ref_claim_no,
          buss_style: data.buss_style,
          payment_for: data.payment_for,
          billing_details: data.payment_details,
          total_amount: data.total_amount
      }).then(response => {
          console.log(response.data);
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Added!'
          }, {root: true});
          // commit('NEW_AGENT', response.data);
      }, () => {
        dispatch('notification/addNotification', {
          type: 'danger',
          message: 'Ops! Something went wrong!'
        }, {root: true});
      });
    },

    async submitPayment({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/submit_payment', {
          id: data.id,
            amount: data.amount,
            payment_type: data.payment_type,
            payment_date: data.payment_date,
            bank_name: data.bank_name,
            account_name: data.account_name,
            check_date: data.check_date,
            check_no: data.check_no,
        }).then(response => {
          dispatch('notification/addNotification', {
            type: 'success',
            message: 'Successfully Added!'
          }, {root: true});
          
          commit('UPDATE_BILLING', response.data.billing);
          resolve(response.data.new);
        }, error => {

          reject(error);
        });
      });
    },

    updatePayment({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/update_payment', {
            id: data.id,
            billing_statement_id: data.billing_statement_id,
            amount: data.amount,
            payment_type: data.payment_type,
            payment_date: data.payment_date,
            bank_name: data.bank_name,
            account_name: data.account_name,
            check_date: data.check_date,
            check_no: data.check_no,
        }).then(response => {
          dispatch('notification/addNotification', {
            type: 'success',
            message: 'Successfully Updated!'
          }, {root: true});

          
          commit('UPDATE_BILLING', response.data.billing);
          resolve(response.data.updated);
        }, error => {

          reject(error);
        });
      });
    },

    async deleteBilling({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_billing_statement/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('REMOVE_BILLING', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
