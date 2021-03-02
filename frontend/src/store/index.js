import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('user'),
    posts: {},
    errorMsg: null,
  },
  getters: {
    showPosts: (state) => state.posts,
  },
  mutations: {
    setUserId: (state, userId) => (state.userId = userId),
    setPosts: (state, posts) => (state.posts = posts),
    updateSignupForm: (state, values) => (state.signupForm = values),
    updateLoginForm: (state, values) => (state.loginForm = values),
  },
  actions: {
    getUser({ commit }, userId) {
      commit('setUserId', userId);
    },
    disconnectUser({ commit }) {
      commit('setUserId', null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (router.options.base != '/') {
        router.push('/');
      }
    },
    createPost() {
      axios.post(`/posts`, { img_url: "images/orange.jpg", user_id: 4 })
        .then(res => {
          console.log(res);
        })
    },
    getPosts({ commit }) {
      axios.get(`/posts`)
        .then(res => {
          commit("setPosts", res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  modules: {
  }
})
