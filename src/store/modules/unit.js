import axios from "axios";

export default {
  namespaced: true,
  state: {
    unit: null,
  },
  getters: {
    units(state) {
      return state.unit;
    },
  },
  mutations: {
    SET_UNIT(state, data) {
        state.unit = data;
    },
    NEW_UNIT(state, data) {
        let items = state.unit.concat(data);
        state.unit = items;
    },
    REMOVE_UNIT(state, id) {
        let items = state.unit.filter(item => item.id != id);
        state.unit = items;
    },
  },
  actions: {
    async fetchUnit({commit}) {
        const response = await axios.get(`resources/units`);

        commit('SET_UNIT', response.data);
    },

    async addUnit({commit, dispatch}, data) {
        await axios.post("resources/add_unit", {
          name: data.name,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('NEW_UNIT', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async deleteUnit({commit, dispatch}, id) {
      const response = await axios.delete(`resources/delete_unit/${id}`);
      if(response.data == 200){
      dispatch('notification/addNotification', {
          type: 'success',
          message: 'Successfully Deleted!'
      }, {root: true});
      
      commit('REMOVE_UNIT', id);
      }else{
          dispatch('notification/addNotification', {
              type: 'danger',
              message: 'Ops! Something went wrong!'
          }, {root: true});
      }
    },
  }
};
