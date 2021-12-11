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

    async findJobOrder({commit}, id) {
        return new Promise((resolve, reject) => {
          axios.get(`resources/find_job_order/${id}`).then(response => {
                resolve(response.data);
            }, error => {
                reject(error);
            });
        })
    },

    async findTimeline({commit}, id) {
        return new Promise((resolve, reject) => {
          axios.get(`resources/find_timeline/${id}`).then(response => {
                resolve(response.data);
            }, error => {
                reject(error);
            });
        })
    },

    async carStartWorking({commit, dispatch, rootState}, data) {
        console.log(data);
        await axios.post("resources/start_working", {
            id: data.form.id,
            date_in: data.form.date_in,
            date_out: data.form.date_out,
            group_work_type: data.group_work_type,
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

    async startWorkingTimeline({commit, dispatch, rootState}, data) {
        await axios.post("resources/start_working_timeline", {
            job_order_id: data.job_order_id,
            timeline_id: data.timeline_id,
            date_start: data.date_start,
            personnel_id: data.personnel_id,
            panels: data.panels,
            commitment_date: data.commitment_date,
            user_id: rootState.auth.user.id,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
          commit('UPDATE_JOB_ORDER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },

    async completeTimeline({commit, dispatch, rootState}, data) {
        await axios.post("resources/complete_timeline", {
            job_order_id: data.job_order_id,
            timeline_id: data.timeline_id,
            date_done: data.date_done,
            remarks: data.remarks,
            user_id: rootState.auth.user.id,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
          commit('UPDATE_JOB_ORDER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },
    
    async updateStatusJobOrder({commit, dispatch, rootState}, data) {
        await axios.post("resources/update_status_job_order", {
            id: data.id,
            status: data.status,
            user_id: rootState.auth.user.id
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});

            commit('UPDATE_JOB_ORDER', response.data);
        }, () => {
            dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
            }, {root: true});
            
        });
    },

    async updateTimeline({commit, dispatch, rootState}, data) {
        await axios.post("resources/update_timeline", {
            job_order_id: data.job_order_id,
            id: data.id,
            date_start: data.date_start,
            commitment_date: data.commitment_date,
            date_done: data.date_done,
            panels: data.panels,
            personnel_id: data.personnel_id,
            remarks: data.remarks,
            user_id: rootState.auth.user.id,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
          commit('UPDATE_JOB_ORDER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },

    async updateJobOrder({commit, dispatch}, data) {
      console.log(data);
        await axios.post("resources/update_job_order", {
          id: data.form.id,
          date: data.form.date,
          insurance_id: data.form.insurance,
          vehicle_id: data.form.vehicle_id,
          services: data.form.services,
          customer_id: data.form.customer_id,
          total_repair_cost: data.payment_form.total_repair_cost,
          policy_deductible: data.payment_form.policy_deductible,
          betterment: data.payment_form.betterment,
          discount: data.payment_form.discount,
          net: data.payment_form.net,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            // console.log(response.data);
          // commit('ADD_ESTIMATE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
        });
    },

  }
};
