import axios from "axios";

export default {
  namespaced: true,
  state: {
    vehicle: [],
  },
  mutations: {
    SET_VEHICLE(state, data) {
        state.vehicle = data;
    },
    NEW_VEHICLE(state, data) {
        let items = state.vehicle.concat(data);
        state.vehicle = items;
    },
    DELETE_VEHICLE(state, id) {
        let items = state.vehicle.filter(item => item.id != id);
        state.vehicle = items;
    },
  },
  actions: {
    async fetchVehicle({commit}, data) {
        const response = await axios.get(`resources/vehicles`);
        
        commit('SET_VEHICLE', response.data);
    },

    async addVehicle({commit, dispatch}, data) {
        
        await axios.post("resources/add_vehicle", {
            vehicle_name: data.vehicle_name,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('NEW_VEHICLE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async deleteVehicle({commit, dispatch}, id) {
      const response = await axios.delete(`resources/delete_vehicle/${id}`);
      if(response.data == 200){
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});
          commit('DELETE_VEHICLE', id);
      }else{
          dispatch('notification/addNotification', {
              type: 'danger',
              message: 'Ops! Something went wrong!'
          }, {root: true});
      }
    },
  }
};
