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
    async downloadDocument({commit}, file_name) {
        // const response = await axios.get(`resources/estimates`);
        await axios.get(`resources/document_download/${file_name}`, {responseType: 'arraybuffer'})
            .then(response => {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = file_name;
            link.click()
        })
    },

    async findDocuments({commit}, id){
      return new Promise((resolve, reject) => {
        axios.get(`resources/find_documents/${id}`).then(response => {

          resolve(response.data);
        }, error => {

          reject(error);
        });
      })
    },

    async findLoaDocuments({commit}, id){
      return new Promise((resolve, reject) => {
        axios.get(`resources/find_loa_documents/${id}`).then(response => {

          resolve(response.data);
        }, error => {

          reject(error);
        });
      })
    },

    async addDocuments({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/add_documents', data.formData, data.config).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Added!'
          }, {root: true});

          commit('estimate/UPDATE_ESTIMATE', response.data, { root: true });

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

    async addJobOrderDocuments({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/add_job_order_documents', data.formData, data.config).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Added!'
          }, {root: true});

          commit('estimate/UPDATE_ESTIMATE', response.data, { root: true });

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

    async addLoaDocuments({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/add_loa_documents', data.formData, data.config).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Added!'
          }, {root: true});

          commit('estimate/UPDATE_ESTIMATE', response.data, { root: true });

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

    async addJobOrderLoaDocuments({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.post('resources/add_job_order_loa_documents', data.formData, data.config).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Added!'
          }, {root: true});

          commit('estimate/UPDATE_ESTIMATE', response.data, { root: true });

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

    async deleteDocument({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_document/${data.id}/${data.estimate_id}`).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});

          commit('estimate/UPDATE_ESTIMATE', response.data, { root: true });

          resolve(response.data);
        }, error => {

          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});

          reject(error);
        });

      });
    },

    async deleteJobOrderDocument({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_job_order_document/${data.id}/${data.job_order_id}`).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});

          commit('job_orders/UPDATE_JOB_ORDER', response.data, { root: true });

          resolve(response.data);
        }, error => {

          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});

          reject(error);
        });

      });
    },

    async deleteLoaDocument({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_loa_document/${data.id}/${data.estimate_id}`).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});

          commit('estimate/UPDATE_ESTIMATE', response.data, { root: true });

          resolve(response.data);
        }, error => {

          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});

          reject(error);
        });

      });
    },

    async deleteJobOrderLoaDocument({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_job_order_loa_document/${data.id}/${data.job_order_id}`).then(response => {
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});

          commit('job_orders/UPDATE_JOB_ORDER', response.data, { root: true });

          resolve(response.data);
        }, error => {

          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});

          reject(error);
        });

      });
    },

  }
};
