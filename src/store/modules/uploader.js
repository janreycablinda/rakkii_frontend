import axios from "axios";

export default {
  namespaced: true,
  state: {
    unit: null,
  },
  getters: {
    units(state) {
      return state.unit;
    },
  },
  mutations: {
    SET_UNIT(state, data) {
        state.unit = data;
    },
  },
  actions: {
    async checkLink({commit}, signature) {
        return new Promise((resolve, reject) => {
        axios.get(`resources/uploader/${signature}`).then(response => {
                resolve(response.data);
            }, error => {
                reject(error);
            });
        })
    },

    async uploadLoaDocument({dispatch}, data) {
        return new Promise((resolve, reject) => {
        axios.post('resources/upload_loa_document', data.formData, data.config).then(response => {
                dispatch('notification/addNotification', {
                    type: 'success',
                    message: 'Successfully Submitted!'
                }, {root: true});

                resolve(response.data);
            }, error => {
                reject(error);
            });
        })
    },
  }
};
