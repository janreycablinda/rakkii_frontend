import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: [],
  },
  mutations: {
    SET_PROPERTY(state, data) {
        state.property = data;
    },
    NEW_PROPERTY(state, data) {
        let items = state.property.concat(data);
        state.property = items;
    },
    DELETE_PROPERTY(state, id) {
        let items = state.property.filter(item => item.id != id);
        state.property = items;
    },
  },
  actions: {
    async findProperty({commit}, id) {
        const response = await axios.get(`resources/find_property/${id}`);
        
        commit('SET_PROPERTY', response.data);
    },

    async emptyProperty({commit}) {
        commit('SET_PROPERTY', []);
    },

    async addProperty({commit, dispatch}, data) {
        
        await axios.post("resources/add_property", {
            customer_id: data.customer_id,
            vehicle_id: data.vehicle_id,
            plate_no: data.plate_no
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('NEW_PROPERTY', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
      },
      
      async deleteProperty({commit, dispatch}, id) {
          const response = await axios.delete(`resources/delete_property/${id}`);
          if(response.data == 200){
              dispatch('notification/addNotification', {
                  type: 'success',
                  message: 'Successfully Deleted!'
              }, {root: true});
              commit('DELETE_PROPERTY', id);
          }else{
              dispatch('notification/addNotification', {
                  type: 'danger',
                  message: 'Ops! Something went wrong!'
              }, {root: true});
          }
      },
  }
};
