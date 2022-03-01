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
    DELETE_SERVICES(state, id) {
        let items = state.services.filter(item => item.id != id);
        state.services = items;
    },
  },
  actions: {
    async fetchServices({commit}) {
        const response = await axios.get(`resources/services`);
        
        commit('SET_SERVICES', response.data);
    },

    async findServices({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`resources/find_services/${id}`).then(response => {
            resolve(response.data);
        }, error => {
            reject(error);
        });
      })
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

    async deleteServices({commit, dispatch}, id) {
      const response = await axios.delete(`resources/delete_services/${id}`);
      if(response.data == 200){
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});
          commit('DELETE_SERVICES', id);
      }else{
          dispatch('notification/addNotification', {
              type: 'danger',
              message: 'Ops! Something went wrong!'
          }, {root: true});
      }
    },
  }
};
