import firebase from 'firebase/app';
import db from '../../firestore.js'
import 'firebase/firestore';

export const STORE_AUTH_ACTION_GET_USERINFO = "STORE_AUTH_ACTION_GET_USERINFO"
export const STORE_AUTH_ACTION_RESET_USERINFO = "STORE_AUTH_ACTION_RESET_USERINFO"
export const STORE_AUTH_ACTION_IS_LOGGED_IN = "STORE_AUTH_ACTION_IS_LOGGED_IN"

const state = {
   isLoggedIn: false,
   activeUser: {}
};

const getters = {
   getUserInfo: state => state,
   isLoggedIn: state => state.isLoggedIn,
   getUserDoc: state => state.activeUser.docId
};

const actions = {
   [STORE_AUTH_ACTION_GET_USERINFO]: ({commit}, payload) => {
      let userObj = {};
      db.collection('users').where("email", "==", payload.email)
         .get()
         .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
               userObj = doc.data();
               userObj.docId = doc.id;
               commit(STORE_AUTH_ACTION_GET_USERINFO, userObj);
            });
            resolve();
         })
         .catch(function (error) {
            console.log("Error getting documents: ", error);
            reject();
         });
   },
   [STORE_AUTH_ACTION_RESET_USERINFO]: ({commit}) => {
      commit(STORE_AUTH_ACTION_RESET_USERINFO);
   },
   [STORE_AUTH_ACTION_IS_LOGGED_IN]: ({commit}, payload) => {
      commit(STORE_AUTH_ACTION_IS_LOGGED_IN, payload);
   }
};

const mutations = {
   [STORE_AUTH_ACTION_GET_USERINFO]: (state, payload) => {      
      state.activeUser = payload
   },
   [STORE_AUTH_ACTION_RESET_USERINFO]: (state) => {
      state.activeUser = {}
   },
   [STORE_AUTH_ACTION_IS_LOGGED_IN]: (state, payload) => {
      state.isLoggedIn = payload;
   }
};

export default {
   state,
   getters,
   actions,
   mutations
}