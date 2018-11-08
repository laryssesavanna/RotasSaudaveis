import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'leaflet/dist/leaflet.css';
import store from '../stores/store';
import axios from 'axios';

const env = require('../../config/dev.env');

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: paths
});
// router gards

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => !record.meta.public)) {
    if (!store.getters.logado) {
      if (to.path === '/callback') {
        store.dispatch('login', to.query);
        axios.get(
          'user',
          {
            params: { 'access_token': to.query.token }
          }
        ).then((response) => {
          store.dispatch('setConta', response.data);
        });
        next();
      } else {
        store.dispatch('login', to.query);
        location.href = 'http://localhost:3000/oauth2/authorize?response_type=token&client_id=' + env.CLIENT_ID + '&state=xyz&redirect_uri=' + encodeURIComponent(env.REDIRECT_URI);
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;

// http://localhost:3000/oauth2/authorize?response_type=code&client_id=8217a562-0c59-48f8-80b5-74d531c42daa&state=xyz&redirect_uri=localhost:8080/callback