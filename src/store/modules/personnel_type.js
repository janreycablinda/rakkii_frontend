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
    REMOVE_PERSONNEL_TYPE(state, id) {
        let items = state.personnel_type.filter(item => item.id != id);
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

    deletePersonnelType({commit, dispatch}, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`resources/delete_personnel_type/${id}`).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});

            commit('REMOVE_PERSONNEL_TYPE', id);
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
  }
};
