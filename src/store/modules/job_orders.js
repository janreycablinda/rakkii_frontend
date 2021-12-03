import axios from "axios";

export default {
  namespaced: true,
  state: {
    job_orders: null,
  },
  mutations: {
    SET_JOB_ORDER(state, data) {
        state.job_orders = data;
    },
    UPDATE_JOB_ORDER(state, data) {
        const index = state.job_orders.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.job_orders.splice(index, 1, data);
        }
    },
  },
  actions: {
    async fetchJobOrder({commit}) {
        const response = await axios.get(`resources/job_orders`);

        commit('SET_JOB_ORDER', response.data);
    },

    async carIn({commit, dispatch, rootState}, data) {
        await axios.post("resources/car_in", {
            item: data.item,
            user_id: rootState.auth.user.id,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
          commit('UPDATE_JOB_ORDER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
  }
};
