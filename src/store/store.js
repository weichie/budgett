import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import authStore from './modules/authStore'
import costStore from './modules/costStore'
import incomeStore from './modules/incomeStore'
import clientStore from './modules/clientStore'
import logStore from './modules/logStore'

export default new Vuex.Store({
   modules: {
      authStore,
      costStore,
      incomeStore,
      clientStore,
      logStore
   }
})