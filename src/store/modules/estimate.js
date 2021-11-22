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
  },
  actions: {
    async fetchEstimate({commit}) {
        const response = await axios.get(`resources/estimates`);

        commit('SET_ESTIMATE', response.data);
    },

    async addEstimate({commit, dispatch}, data) {
        await axios.post("resources/add_estimate", data.formData, data.config).then(response => {
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

  }
};
