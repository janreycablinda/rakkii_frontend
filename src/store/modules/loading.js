
export default {
    namespaced: true,
    state: {
      loading: [],
    },
    getters: {
        loading(state) {
        return state.loading;
      },
    },
    mutations: {
        PUSH_LOADING(state, loading) {
          state.loading.push({
              ...loading,
              id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
          });
        },
    },
    actions: {
      addLoading({commit}, loading){
        commit('PUSH_LOADING', loading);
      }
    }
  };
  