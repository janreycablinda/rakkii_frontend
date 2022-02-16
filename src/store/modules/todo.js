import axios from "axios";

export default {
  namespaced: true,
  state: {
    todos: [],
    todos_finished: []
  },
  mutations: {
    SET_TODO(state, data) {
        state.todos = data;
    },
    SET_TODO_FINISHED(state, data) {
        state.todos_finished = data;
    },
    ADD_TODO(state, data) {
        let todos = state.todos.concat(data);
        state.todos = todos;
    },
    REMOVE_TODO(state, id) {
        let items = state.todos.filter(item => item.id != id);
        state.todos = items;
    },
    REMOVE_TODO_FINISHED(state, id) {
        let items = state.todos_finished.filter(item => item.id != id);
        state.todos_finished = items;
    },
  },
  actions: {
    async fetchToDo({commit}) {
        const response = await axios.get(`resources/todos`);
        const todos = [];
        const todos_finished = [];
        response.data.forEach(item => {
            if(item.status == 'todo'){
                todos.push(item);
            }else{
                todos_finished.push(item);
            }
        });
        commit('SET_TODO', todos);
        commit('SET_TODO_FINISHED', todos_finished);
    },

    async addToDo({commit, dispatch}, todo) {
        await axios.post("resources/add_todo", {
          todo: todo
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            
            commit('ADD_TODO', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateTodo({commit, dispatch}, todo) {
        if(todo.status == 'todo'){
            commit('SET_TODO', todo.value);
        }else{
            commit('SET_TODO_FINISHED', todo.value);
        }
        await axios.post("resources/update_todo", {
          todo: todo.value
        }).then(() => {

        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async changeStatusTodo({commit, dispatch}, todo) {
        await axios.post("resources/update_status_todo", {
          id: todo.id
        }).then(() => {
            
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },
    
    async deleteTodo({commit, dispatch}, todo) {
      const response = await axios.delete(`resources/delete_todo/${todo.id}`);
      if(response.data == 200){
        dispatch('notification/addNotification', {
            type: 'success',
            message: 'Successfully Deleted!'
        }, {root: true});
        if(todo.status == 'todo'){
            commit('REMOVE_TODO', todo.id);
        }else{
            commit('REMOVE_TODO_FINISHED', todo.id);
        }
      }else{
          dispatch('notification/addNotification', {
              type: 'danger',
              message: 'Ops! Something went wrong!'
          }, {root: true});
      }
    },
  }
};
