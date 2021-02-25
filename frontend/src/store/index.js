import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: "http://localhost:3000/api",
    users: {},
    signupForm: {
      lastName: null,
      firstName: null,
      email: null,
      password: null,
    },
    loginForm: {
      email: null,
      password: null,
    }
  },
  mutations: {
    setUser: (state, users) => (state.users = users),
    updateSignupForm: (state, values) => (state.signupForm = values),
    updateLoginForm: (state, values) => (state.loginForm = values)
  },
  actions: {
    getOneUser({ commit }) {
      axios.post(`${this.state.apiUrl}/auth/login`, this.state.loginForm)
        .then(res => {
          console.log(res.data);
          commit("setUser", res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    saveUser() {
      console.log(this.state.signupForm);
      axios.post(`${this.state.apiUrl}/auth/signup`, this.state.signupForm)
        .then(response => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })

    }
  },
  modules: {
  }
})
