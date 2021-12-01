import axios from "axios";

export default {
  namespaced: true,
  state: {
    supplier: [],
  },
  mutations: {
    SET_SUPPLIER(state, data) {
        state.supplier = data;
    },
    NEW_SUPPLIER(state, data) {
        let items = state.supplier.concat(data);
        state.supplier = items;
    },
    DELETE_SUPPLIER(state, id) {
        let items = state.supplier.filter(item => item.id != id);
        state.supplier = items;
    },
  },
  actions: {
    async fetchSupplier({commit}) {
        const response = await axios.get(`resources/supplier`);
        
        commit('SET_SUPPLIER', response.data);
    },

    async addSupplier({commit, dispatch}, data) {
        
        await axios.post("resources/add_supplier", {
            supplier_name: data.supplier_name,
            contact_person: data.contact_person,
            phone: data.phone,
            email: data.email,
            address: data.address,
            tin: data.tin,
            terms: data.terms,
            payment_mode: data.payment_mode,
            check_dated: data.check_dated,
            shipping_mode: data.shipping_mode,
            deliver_type: data.deliver_type,
            deliver_cost: data.deliver_cost,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('NEW_SUPPLIER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async deleteSupplier({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_supplier/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            commit('DELETE_SUPPLIER', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
