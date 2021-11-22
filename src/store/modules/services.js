import axios from "axios";

export default {
  namespaced: true,
  state: {
    services: [],
  },
  mutations: {
    SET_SERVICES(state, data) {
        state.services = data;
    },
    NEW_SERVICES(state, data) {
        let items = state.services.concat(data);
        state.services = items;
    },
  },
  actions: {
    async fetchServices({commit}) {
        const response = await axios.get(`resources/services`);
        
        commit('SET_SERVICES', response.data);
    },

    async addServices({commit, dispatch}, data) {
        
        await axios.post("resources/add_services", {
            services_type_id: data.services_type_id,
            services_name: data.services_name
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('NEW_SERVICES', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
  }
};
