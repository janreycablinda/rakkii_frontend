import axios from "axios";

export default {
  namespaced: true,
  state: {
    sub_services: [],
  },
  mutations: {
    SET_SUB_SERVICES(state, data) {
        state.services = data;
    },
    NEW_SUB_SERVICES(state, data) {
        let items = state.services.concat(data);
        state.services = items;
    },
  },
  actions: {
    async fetchServices({commit}) {
        const response = await axios.get(`resources/services`);

        commit('SET_SERVICES', response.data);
    },

    
    async findSubServices({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`resources/sub_services/${id}`).then(response => {
            resolve(response.data);
        }, error => {
            reject(error);
        });
      })
    },

    async addSubServices({commit, dispatch}, data) {
        
        await axios.post("resources/add_sub_services", {
            services_id: data.services_id,
            services_name: data.name
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('services/SET_SERVICES', response.data, { root: true });
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
  }
};
