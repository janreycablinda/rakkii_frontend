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
  }
};
