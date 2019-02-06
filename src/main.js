import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import store from './store/store'
import { routes } from './routes'

import { 
  STORE_AUTH_ACTION_GET_USERINFO,
  STORE_AUTH_ACTION_IS_LOGGED_IN
} from './store/modules/authStore'

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
});

let app = '';

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login');
  else if(!requiresAuth && currentUser) next('dashboard');
  else next();
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(STORE_AUTH_ACTION_GET_USERINFO, firebase.auth().currentUser);
    store.dispatch(STORE_AUTH_ACTION_IS_LOGGED_IN, true);
  }
  
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
