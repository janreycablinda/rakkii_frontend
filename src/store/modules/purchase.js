import axios from "axios";

export default {
  namespaced: true,
  state: {
    purchase: [],
  },
  mutations: {
    SET_PURCHASE(state, data) {
        state.purchase = data;
    },
    ADD_PURCHASE(state, data) {
        let items = state.purchase.concat(data);
        state.purchase = items;
    },
    REMOVE_PURCHASE(state, id) {
        let items = state.purchase.filter(item => item.id != id);
        state.purchase = items;
    },
  },
  actions: {
    // async fetchPurchase({commit}, file_name) {
    //     const response = await axios.get(`resources/purchases`);
    //     console.log(response.data);
    //     commit('SET_PURCHASE', response.data);
    // },

    async addPurchases({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post("resources/add_purchases", data.formData, data.config).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            // commit('job_orders/UPDATE_JOB_ORDER', response.data, {root: true});
            
            resolve(response.data);
          }, error => {
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
          
            reject(error);
          });
      })
    },

    async deletePurchase({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_purchase/${data.id}/${data.job_order_id}`).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});

            commit('REMOVE_PURCHASE', data.id);
            resolve(response.data);
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
