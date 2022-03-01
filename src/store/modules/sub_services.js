import axios from "axios";

export default {
  namespaced: true,
  state: {
    sub_services: [],
    find_sub_services: []
  },
  mutations: {
    SET_SUB_SERVICES(state, data) {
        state.sub_services = data;
    },
    SET_FIND_SUB_SERVICES(state, data) {
        state.find_sub_services = data;
    },
    DELETE_FIND_SUB_SERVICES(state, id) {
      let items = state.find_sub_services.filter(item => item.id != id);
      state.find_sub_services = items;
    },
    NEW_SUB_SERVICES(state, data) {
        let items = state.sub_services.concat(data);
        state.sub_services = items;
    },
    DELETE_SUB_SERVICES(state, id) {
      let items = state.sub_services.filter(item => item.id != id);
      state.sub_services = items;
    }
  },
  actions: {
    async fetchServices({commit}) {
        const response = await axios.get(`resources/services`);

        commit('SET_SERVICES', response.data);
    },
    
    async findSubServices({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`resources/sub_services/${id}`).then(response => {
            commit('SET_FIND_SUB_SERVICES', response.data)
            resolve(response.data);
        }, error => {
            reject(error);
        });
      })
    },

    async addSubServices({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/add_sub_services', {
            services_id: data.services_id,
            services_name: data.name
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
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

    async deleteSubServices({commit, dispatch}, id) {
      const response = await axios.delete(`resources/delete_sub_services/${id}`);
      if(response.data == 200){
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});
          commit('DELETE_FIND_SUB_SERVICES', id);
      }else{
          dispatch('notification/addNotification', {
              type: 'danger',
              message: 'Ops! Something went wrong!'
          }, {root: true});
      }
    },
  }
};
