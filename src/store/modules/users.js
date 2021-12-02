import axios from "axios";

export default {
  namespaced: true,
  state: {
    users: null,
  },
  mutations: {
    SET_USERS(state, data) {
        state.users = data;
    },
  },
  actions: {
    async fetchUsers({commit}) {
        const response = await axios.get(`resources/users`);

        commit('SET_USERS', response.data);
    },
  }
};
