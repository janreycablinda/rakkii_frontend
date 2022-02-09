import axios from "axios";
import ability from '../../services/ability';

export default {
  namespaced: true,
  state: {
    roles: [],
    role_options: [],
  },
  getters: {
    roles(state) {
      return state.roles;
    },
  },
  mutations: {
    SET_ROLES(state, data) {
        state.roles = data;
    },
    SET_ROLE_OPTION(state, data) {
        state.role_options = data;
    },
    ADD_ROLE(state, data) {
        let roles = state.roles.concat(data);
        state.roles = roles;
    },
    UPDATE_ROLE(state, data) {
        const index = state.roles.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.roles.splice(index, 1, data);
        }
    },
    REMOVE_ROLE(state, id) {
        let items = state.roles.filter(item => item.id != id);
        state.roles = items;
    },
  },
  actions: {
    async fetchRoles({commit}) {
        const response = await axios.get(`resources/roles`);

        commit('SET_ROLES', response.data);
    },

    async fetchOptionRoles({commit}) {
      const response = await axios.get(`resources/role_options`);

      commit('SET_ROLE_OPTION', response.data);
    },
    
    async addRole({commit, dispatch}, data) {
        await axios.post("resources/add_role", {
          role_name: data.role_name,
          permissions: data.permission
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            console.log(response);
            commit('ADD_ROLE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateRole({commit, dispatch}, data) {
        await axios.put("resources/update_role", {
          id: data.id,
          role_name: data.role_name,
          permissions: data.permission
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});

            let permissions = [];
            let permission = [];
            response.data.permissions.forEach(item => {
              if(item.permission){
                permissions.push({action: item.permission.action, page: item.permission.page})
                permission.push({action: item.permission.action, subject: item.permission.page})
              }
            });

            ability.update(permission);
            localStorage.setItem("permissions", JSON.stringify(permissions));
            
            commit('UPDATE_ROLE', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
    

    async deleteRole({commit, dispatch}, id) {
      const response = await axios.delete(`resources/delete_role/${id}`);
      if(response.data == 200){
          dispatch('notification/addNotification', {
              type: 'success',
              message: 'Successfully Deleted!'
          }, {root: true});
          
          commit('REMOVE_ROLE', id);
          }else{
              dispatch('notification/addNotification', {
                  type: 'danger',
                  message: 'Ops! Something went wrong!'
              }, {root: true});
          }
    },
  }
};
