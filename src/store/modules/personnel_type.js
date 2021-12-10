import axios from "axios";

export default {
  namespaced: true,
  state: {
    personnel_type: [],
  },
  mutations: {
    SET_PERSONNEL_TYPE(state, data) {
        state.personnel_type = data;
    },
    NEW_PERSONNEL_TYPE(state, data) {
        let items = state.personnel_type.concat(data);
        state.personnel_type = items;
    },
  },
  actions: {
    async fetchPersonnelType({commit}) {
        const response = await axios.get(`resources/personnel_types`);
        
        commit('SET_PERSONNEL_TYPE', response.data);
    },

    async addPersonnelType({commit, dispatch}, data) {
        await axios.post("resources/add_personnel_type", {
            name: data.name,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('NEW_PERSONNEL_TYPE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },
  }
};
