import axios from "axios";

export default {
  namespaced: true,
  state: {
    personnel: [],
  },
  mutations: {
    SET_PERSONNEL(state, data) {
        state.personnel = data;
    },
    NEW_PERSONNEL(state, data) {
        let items = state.personnel.concat(data);
        state.personnel = items;
    },
  },
  actions: {
    async fetchPersonnel({commit}) {
        const response = await axios.get(`resources/personnels`);
        
        commit('SET_PERSONNEL', response.data);
    },

    async addPersonnel({commit, dispatch}, data) {
        await axios.post("resources/add_personnel", {
            name: data.name,
            address: data.address,
            phone: data.phone,
            personnel_type_id: data.personnel_type_id
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('NEW_PERSONNEL', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },
  }
};
