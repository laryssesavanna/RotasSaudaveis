import { http } from './configpg';

export const getUser = (userId) => http.get('/profile/' + userId);
export const postUser = (userId) => http.post('/profile', userId);
export const putUser = (userId, user) => http.put('/profile/' + userId, user);
export const deleteUser = (userId) => http.delete('/profile/' + userId);