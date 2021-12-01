import axios from "axios";

export default {
  namespaced: true,
  state: {
    estimate: [],
  },
  mutations: {
    SET_ESTIMATE(state, data) {
        state.estimate = data;
    },
    ADD_ESTIMATE(state, data) {
        let items = state.estimate.concat(data);
        state.estimate = items;
    },
    UPDATE_ESTIMATE(state, data) {
      const index = state.estimate.findIndex(item => item.id === data.id);
      if(index !== -1){
        state.estimate.splice(index, 1, data);
      }
    },
    DELETE_ESTIMATE(state, id) {
      let items = state.estimate.filter(item => item.id != id);
      state.estimate = items;
    },
  },
  actions: {
    async fetchEstimate({commit}) {
        const response = await axios.get(`resources/estimates`);

        commit('SET_ESTIMATE', response.data);
    },

    async findEstimate({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`resources/find_estimates/${id}`).then(response => {
            resolve(response.data);
        }, error => {
            reject(error);
        });
      })
    },

    async findSubServices({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`resources/find_sub_services/${id}`).then(response => {
            resolve(response.data);
        }, error => {
            reject(error);
        });
      })
    },

    async addEstimate({commit, dispatch}, data) {
        await axios.post("resources/add_estimate", data.formData, data.config).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            console.log(response.data);
           commit('ADD_ESTIMATE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateEstimate({commit, dispatch}, data) {
        await axios.post("resources/update_estimate", data.formData, data.config).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            // console.log(response.data);
          // commit('ADD_ESTIMATE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async addEstimateSaveSend({commit, dispatch}, data) {
        await axios.post("resources/add_estimate_save_send").then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});

           commit('ADD_ESTIMATE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateStatusEstimate({commit, dispatch}, data) {
      await axios.post("resources/update_status_estimate", {
        id: data.id,
        status: data.status
      }).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Updated!'
          }, {root: true});

         commit('UPDATE_ESTIMATE', response.data);
      }, () => {
        dispatch('notification/addNotification', {
          type: 'danger',
          message: 'Ops! Something went wrong!'
        }, {root: true});
        
      });
    },

    async deleteEstimate({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_estimate/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('DELETE_ESTIMATE', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },

    async convertEstimate({commit, dispatch}, data) {
      await axios.post("resources/convert_estimate", {
        id: data.id,
        status: data.status
      }).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Updated!'
          }, {root: true});

         commit('UPDATE_ESTIMATE', response.data);
      }, () => {
        dispatch('notification/addNotification', {
          type: 'danger',
          message: 'Ops! Something went wrong!'
        }, {root: true});
        
      });
    },

  }
};
