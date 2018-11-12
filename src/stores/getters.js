import axios from 'axios';

export default {
  token: state => {
    return state.conta.token;
  },
  conta: state => {
    return state.conta;
  },
  logado: state => {
    return state.conta.logado;
  }
};
