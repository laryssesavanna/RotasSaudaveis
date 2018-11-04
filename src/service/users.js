import { http } from './configpg';

export default { // listar: (json)

  listUsers: () => {
    return http.get('/user');
  }

  /* postUser: (user) => {
    return http.post('/user', user);
  },

  putUser: (user, id) => {
    return http.put('/user/' + id, user);// ver o id
  },

  deleteUser: (id) => {
    return http.delete('user', id); */
  }
};