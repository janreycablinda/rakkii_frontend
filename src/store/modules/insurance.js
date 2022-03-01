import axios from "axios";

export default {
  namespaced: true,
  state: {
    insurance: [],
    insurance_profile: []
  },
  mutations: {
    SET_INSURANCE(state, data) {
        state.insurance = data;
    },
    SET_INSURANCE_PROFILE(state, data) {
        state.insurance_profile = data;
    },
    NEW_INSURANCE(state, data) {
        let items = state.insurance.concat(data);
        state.insurance = items;
    },
    DELETE_INSURANCE(state, id) {
        let items = state.insurance.filter(item => item.id != id);
        state.insurance = items;
    },
  },
  actions: {
    async fetchInsurance({commit}, data) {
        const response = await axios.get(`resources/insurance`);
        
        commit('SET_INSURANCE', response.data);
    },

    async fetchInsuranceProfile({commit}, id) {
        const response = await axios.get(`resources/find_insurance/${id}`);
        console.log(response.data);
        commit('SET_INSURANCE_PROFILE', response.data);
    },

    async addInsurance({commit, dispatch}, data) {
        
        await axios.post("resources/add_insurance", {
            insurance_name: data.insurance_name,
            insurance_type: data.insurance_type,
            contact_person: data.contact_person,
            phone: data.phone,
            email: data.email,
            address: data.address,
            tin: data.tin
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

    async deleteInsurance({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_insurance/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('DELETE_INSURANCE', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
