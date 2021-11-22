import axios from "axios";

export default {
  namespaced: true,
  state: {
    services_type: [],
  },
  mutations: {
    SET_SERVICES_TYPE(state, data) {
        state.services_type = data;
    },
    NEW_SERVICES_TYPE(state, data) {
        let items = state.services_type.concat(data);
        state.services_type = items;
    },
  },
  actions: {
    async fetchServicesType({commit}) {
        const response = await axios.get(`resources/services_type`);

        commit('SET_SERVICES_TYPE', response.data);
    },

    async addServicesType({commit, dispatch}, data) {
        await axios.post("resources/add_services_type", {
            name: data.name
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('NEW_SERVICES_TYPE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
  }
};
