import axios from "axios";

export default {
  namespaced: true,
  state: {
    country: [],
  },
  getters: {
    countries(state) {
      return state.country;
    },
  },
  mutations: {
    SET_COUNTRY(state, data) {
        state.country = data;
    },
  },
  actions: {
    async fetchCountry({commit}) {
      
      const response = await axios.get(`resources/get_country`);
      console.log(response.data);
      commit('SET_COUNTRY', response.data);

    },
  }
};
