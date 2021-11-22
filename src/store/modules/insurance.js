import axios from "axios";

export default {
  namespaced: true,
  state: {
    insurance: [],
  },
  mutations: {
    SET_INSURANCE(state, data) {
        state.insurance = data;
    },
    NEW_INSURANCE(state, data) {
        let items = state.insurance.concat(data);
        state.insurance = items;
    },
  },
  actions: {
    async fetchInsurance({commit}, data) {
        const response = await axios.get(`resources/insurance`);
        
        commit('SET_INSURANCE', response.data);
    },

    async addInsurance({commit, dispatch}, data) {
        
        await axios.post("resources/add_insurance", {
            insurance_name: data.insurance_name,
            insurance_type: data.insurance_type,
            contact_person: data.contact_person,
            phone: data.phone,
            email: data.email,
            address: data.address,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('NEW_INSURANCE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
  }
};
