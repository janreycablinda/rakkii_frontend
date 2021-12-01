import axios from "axios";

export default {
  namespaced: true,
  state: {
    customer: [],
    profile: ''
  },
  getters: {
    customer(state) {
      return state.customer;
    },
  },
  mutations: {
    SET_CUSTOMER(state, data) {
        state.customer = data;
    },

    SET_PROFILE(state, data) {
        state.profile = data;
    },

    NEW_CUSTOMER(state, data) {
        let items = state.customer.concat(data);
        state.customer = items;
    },

    UPDATE_CUSTOMER(state, data) {
        const index = state.customer.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.customer.splice(index, 1, data);
        }
    },

    DELETE_CUSTOMER(state, id) {
        let items = state.customer.filter(item => item.id != id);
        state.customer = items;
    },
  },
  actions: {
    async fetchCustomer({commit}) {
        const response = await axios.get(`resources/customers`);

        commit('SET_CUSTOMER', response.data);
    },

    async fetchProfile({commit}, id) {
        const response = await axios.get(`resources/get_customer_profile/${id}`);
        
        commit('SET_PROFILE', response.data);
    },

    async addCustomer({commit, dispatch, rootState}, data) {
        await axios.post("resources/create_customer", {
            form: data.form,
            user_id: rootState.auth.user.id
        }).then(response => {
            console.log(response.data);
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('NEW_CUSTOMER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },

    async updateCustomer({commit, dispatch, rootState}, data) {
        await axios.put("resources/update_item", {
            company_id: data.company_id,
            user_id: rootState
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
            commit('UPDATE_CUSTOMER', response.data);
        }, () => {
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
          
        });
    },

    async deleteCustomer({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_customer/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('DELETE_CUSTOMER', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
