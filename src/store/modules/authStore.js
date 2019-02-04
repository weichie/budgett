import firebase from 'firebase/app';
import db from '../../firestore.js'
import 'firebase/firestore';

export const STORE_AUTH_ACTION_GET_USERINFO = "STORE_AUTH_ACTION_GET_USERINFO"
export const STORE_AUTH_ACTION_SET_USERINFO = "STORE_AUTH_ACTION_SET_USERINFO"
export const STORE_AUTH_ACTION_RESET_USERINFO = "STORE_AUTH_ACTION_RESET_USERINFO"

const state = {
   activeUser: {}
};

const getters = {
   getUserInfo: (state, getters, rootState) => {
      return state;
   }
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
               commit(STORE_AUTH_ACTION_SET_USERINFO, userObj);
            })
         })
         .catch(function (error) {
            console.log("Error getting documents: ", error);
         });
   },
   [STORE_AUTH_ACTION_RESET_USERINFO]: ({commit}) => {
      commit(STORE_AUTH_ACTION_RESET_USERINFO);
   }
};

const mutations = {
   [STORE_AUTH_ACTION_SET_USERINFO]: (state, payload) => {      
      state.activeUser = payload
   },
   [STORE_AUTH_ACTION_RESET_USERINFO]: (state) => {
      state.activeUser = {}
   }
};

export default {
   state,
   getters,
   actions,
   mutations
}