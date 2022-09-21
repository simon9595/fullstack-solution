// import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    userData: {
      userId: '',
      username: '',
      email: '',
      isAdmin: false,
      token: ''
    }
  },
  getters: {
  },
  mutations: {
    loginData(state, [userId, username, email, isAdmin, token]){
      state.userData.userId = userId;
      state.userData.username = username;
      state.userData.email = email;
      state.userData.isAdmin = isAdmin;
      state.userData.token = token;
    }
  },
  actions: { //getAllPosts should be an action
  },
  modules: {
  }
})
