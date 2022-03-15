import axios from "axios";
import ability from '../../services/ability';

export default {
  namespaced: true,
  state: {
    roles: [],
    role_options: [],
  },
  getters: {
    roles(state) {
      return state.roles;
    },
  },
  mutations: {
    SET_ROLES(state, data) {
        state.roles = data;
    },
    SET_ROLE_OPTION(state, data) {
        state.role_options = data;
    },
    ADD_ROLE(state, data) {
        let roles = state.roles.concat(data);
        state.roles = roles;
    },
    UPDATE_ROLE(state, data) {
        const index = state.roles.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.roles.splice(index, 1, data);
        }
    },
    REMOVE_ROLE(state, id) {
        let items = state.roles.filter(item => item.id != id);
        state.roles = items;
    },
  },
  actions: {
    async generateCashCollectedReport({commit}, data) {
        const response = await axios.get(`resources/cash_collected_report/${data}`);
        console.log(response.data);
        // commit('SET_ROLES', response.data);
    },

    async fetchOptionRoles({commit}) {
      const response = await axios.get(`resources/role_options`);

      commit('SET_ROLE_OPTION', response.data);
    },
    
  }
};
