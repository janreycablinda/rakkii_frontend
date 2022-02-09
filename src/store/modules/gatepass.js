import axios from "axios";

export default {
  namespaced: true,
  actions: {
    async getPassNo() {
        return new Promise((resolve, reject) => {
            axios.get('resources/gate_pass_no').then(response => {

              resolve(response.data);
            }, error => {
    
              reject(error);
            });
          });
    },
    async submitGatePass({commit, dispatch}, data){
        await axios.post("resources/submit_gatepass", {
            job_order_id: data.id
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Submitted!'
            }, {root: true});
            commit('job_orders/UPDATE_JOB_ORDER', response.data, {root: true});
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },
    async deleteGatePass({commit, dispatch}, data){
        await axios.post("resources/delete_gatepass", {
            id: data.gatepass.id,
            job_order_id: data.id
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('job_orders/UPDATE_JOB_ORDER', response.data, {root: true});
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    }
  }
};
