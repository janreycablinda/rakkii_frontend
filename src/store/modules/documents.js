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

        // commit('SET_ESTIMATE', response.data);
    },

  }
};
