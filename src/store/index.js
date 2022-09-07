import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {
      UUID: '123j1o4ji12-fsfs',
      username: 'Sample text',
      email: 'sample@text.com',
      token: null,
      isAdmin: null
    }
  },
  getters: {
    // username: (state) {
    //   return '${state.username}'
    // }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
