import firebase from 'firebase/app'
import db from '../../firestore'

export const STORE_INCOME_GET_DOC_ID = "STORE_INCOME_GET_DOC_ID"
export const STORE_INCOME_RESET_DOC_ID = "STORE_INCOME_RESET_DOC_ID"

const state = {
   docId: null
};

const getters = {
   getIncomeDocId: state => state.docId
};

const actions = {
   [STORE_INCOME_GET_DOC_ID]: ({commit}, payload) => {
      commit(STORE_INCOME_GET_DOC_ID, payload);
   },
   [STORE_INCOME_RESET_DOC_ID]: ({commit}) => {
      commit(STORE_INCOME_RESET_DOC_ID);
   }
};

const mutations = {
   [STORE_INCOME_GET_DOC_ID]: (state, payload) => {
      state.docId = payload;
   },
   [STORE_INCOME_RESET_DOC_ID]: state => {
      state.docId = null
   }
};

export default {
   state,
   getters,
   actions,
   mutations
}