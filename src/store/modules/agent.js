import axios from "axios";

export default {
  namespaced: true,
  state: {
    agent: [],
  },
  mutations: {
    SET_AGENT(state, data) {
        state.agent = data;
    },

    NEW_AGENT(state, data) {
        let items = state.agent.concat(data);
        state.agent = items;
    },
  },
  actions: {
    async fetchAgent({commit}) {
      
      const response = await axios.get(`resources/agents`);
      console.log(response.data);
      commit('SET_AGENT', response.data);

    },

    async addAgent({commit, dispatch}, data) {
        await axios.post("resources/create_agent", {
            name: data.name,
            address: data.address,
            contact_no: data.contact_no
        }).then(response => {
            console.log(response.data);
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('NEW_AGENT', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },
  }
};
