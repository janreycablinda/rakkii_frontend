
import axios from "axios";

export default {
    namespaced: true,
    state: {
      notifications: [],
      notification_message: []
    },
    getters: {
      notifications(state) {
        return state.notifications;
      },
    },
    mutations: {
      PUSH_NOTIFICATION(state, notification) {
        state.notifications.push({
            ...notification,
            id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
        });
      },
      SET_MESSAGE_NOTIFICATION(state, data) {
          state.notification_message = data;
      },
    },
    actions: {
      addNotification({commit}, notification){
          commit('PUSH_NOTIFICATION', notification);
      },
      async fetchNotification({commit}){
          const response = await axios.get(`resources/notifications`);
          console.log(response.data);
          commit('SET_MESSAGE_NOTIFICATION', response.data);
      }
    }
  };
  