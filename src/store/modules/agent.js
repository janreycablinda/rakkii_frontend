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
    DELETE_AGENT(state, id) {
        let items = state.agent.filter(item => item.id != id);
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

    async deleteAgent({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_agent/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('DELETE_AGENT', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};