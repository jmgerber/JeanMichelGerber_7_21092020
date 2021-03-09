import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('user'),
    connectedUser: null,
    posts: null,
    errorMsg: null,
    likes: null
  },
  getters: {
    showConnectedUser: (state) => state.connectedUser,
    showPosts: (state) => state.posts,
  },
  mutations: {
    setUserId: (state, userId) => (state.userId = userId),
    setConnectedUser: (state, user) => (state.connectedUser = user),
    setPosts: (state, posts) => (state.posts = posts),
  },
  actions: {
    getUserId({ commit }, userId) {
      commit('setUserId', userId);
    },
    getOneUser({ commit }) {
      axios.post('auth/user', { id: this.state.userId })
        .then(res => {
          commit('setConnectedUser', res.data)
        })
        .catch((error) => {
          console.log(error);
        })
    },
    disconnectUser({ commit }) {
      commit('setUserId', null);
      commit('setConnectedUser', null);
      localStorage.clear();
      if (router.options.base != '/') {
        router.push('/');
      }
    },
    getPosts({ commit }) {
      axios.get('/posts/' + this.state.userId)
        .then(res => {
          commit("setPosts", res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    likePost(res, payload) {
      axios
        .post("/posts/like", {
          postId: payload.id,
          userId: parseInt(this.state.userId),
          likeValue: payload.likeValue
        })
        .then(() => {
          this.dispatch('getPosts');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(res, payload) {
      axios.delete("/posts/" + payload.id)
        .then(res => {
          console.log(res);
          this.dispatch('getPosts');
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  modules: {
  }
})
