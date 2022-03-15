import axios from "axios";

export default {
  namespaced: true,
  state: {
    expenses_type: [],
  },
  mutations: {
    SET_EXPENSES_TYPE(state, data) {
        state.expenses_type = data;
    },

    NEW_EXPENSES_TYPE(state, data) {
        let items = state.expenses_type.concat(data);
        state.expenses_type = items;
    },

    // UPDATE_ITEM(state, data) {
    //     const index = state.item.findIndex(item => item.id === data.id);
    //     if(index !== -1){
    //       state.item.splice(index, 1, data);
    //     }
    // },
    
    DELETE_EXPENSES_TYPE(state, id) {
        let items = state.expenses_type.filter(item => item.id != id);
        state.expenses_type = items;
    },
  },
  actions: {
    async fetchExpensesType({commit}) {
        const response = await axios.get(`resources/expenses_type`);

        commit('SET_EXPENSES_TYPE', response.data);
    },

    async createExpensesType({commit, dispatch, rootState}, data) {
        await axios.post("resources/create_expenses_type", {
            expenses_name: data.expenses_name
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
          commit('NEW_EXPENSES_TYPE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    // async updateItem({commit, dispatch, rootState}, data) {
    //     await axios.put("resources/update_item", {
    //         id: data.id,
    //         item: data.item,
    //         description: data.description,
    //         brand: data.brand,
    //         qty: data.qty,
    //         price: data.price,
    //         unit: data.unit,
    //         notifier: data.notifier,
    //         unit_cost: data.unit_cost,
    //         group_id: data.group_id,
    //         user_id: rootState.auth.user.id,
    //     }).then(response => {
    //         dispatch('notification/addNotification', {
    //             type: 'success',
    //             message: 'Successfully Updated!'
    //         }, {root: true});
    //         commit('UPDATE_ITEM', response.data);
    //     }, () => {
    //         dispatch('notification/addNotification', {
    //             type: 'danger',
    //             message: 'Ops! Something went wrong!'
    //         }, {root: true});
          
    //     });
    // },

    async deleteExpensesType({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_expenses_type/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('DELETE_EXPENSES_TYPE', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
