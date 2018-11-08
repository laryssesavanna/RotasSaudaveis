import axios from 'axios';

export default {
  login ({ commit }, payload) {
    console.log(payload);
    localStorage.setItem('token', payload.token);
    axios.defaults.headers.common['X-Auth-token'] = payload.token;
    commit('SET_CODE', payload);
  },
  setConta ({ commit }, payload) {
    commit('SET_CONTA', payload);
  },
  logout ({ commit }) {
    commit('LOGOUT');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + null;
    localStorage.removeItem('token');
  }
};
