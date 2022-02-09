import axios from "axios";

export default {
  namespaced: true,
  state: {
    users: null,
  },
  mutations: {
    SET_USERS(state, data) {
        state.users = data;
    },
    ADD_USER(state, data) {
        let users = state.users.concat(data);
        state.users = users;
    },
    UPDATE_USER(state, data) {
        const index = state.users.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.users.splice(index, 1, data);
        }
    },
    REMOVE_USER(state, id) {
        let items = state.users.filter(item => item.id != id);
        state.users = items;
    },
  },
  actions: {
    async fetchUsers({commit}) {
        const response = await axios.get(`resources/users`);

        commit('SET_USERS', response.data);
    },

    async addUser({commit, dispatch}, data) {
        await axios.post("resources/add_user", {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          role_id: data.role_id.value
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('ADD_USER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateUser({commit, dispatch}, data) {
        await axios.put("resources/update_user", {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          role_id: data.role_id
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});

            commit('UPDATE_USER', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async deleteUser({commit, dispatch}, id) {
      const response = await axios.delete(`resources/delete_user/${id}`);
      if(response.data == 200){
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});
          
          commit('REMOVE_USER', id);
          }else{
              dispatch('notification/addNotification', {
                  type: 'danger',
                  message: 'Ops! Something went wrong!'
              }, {root: true});
          }
    },
  }
};
