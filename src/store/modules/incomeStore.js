import firebase from 'firebase/app'
import db from '../../firestore'

export const STORE_INCOME_GET_DOC_ID = "STORE_INCOME_GET_DOC_ID"
export const STORE_INCOME_RESET_DOC_ID = "STORE_INCOME_RESET_DOC_ID"
export const STORE_INCOME_GET_TOTAL = "STORE_INCOME_GET_TOTAL"

const state = {
   docId: null,
   totalIncome: 0
};

const getters = {
   getIncomeDocId: state => state.docId,
   getTotalIncome: state => state.totalIncome
};

const actions = {
   [STORE_INCOME_GET_DOC_ID]: ({commit}, payload) => {
      commit(STORE_INCOME_GET_DOC_ID, payload);
   },
   [STORE_INCOME_RESET_DOC_ID]: ({commit}) => {
      commit(STORE_INCOME_RESET_DOC_ID);
   },
   [STORE_INCOME_GET_TOTAL]: ({commit, getters}) => {
      const incomeCollection = 'income/' + getters.getIncomeDocId
      const years = ['2018', '2019'];

      if (incomeCollection) {
         let totals = 0;

         for (let year of years) {
            db.collection(incomeCollection + '/' + year)
               .get()
               .then(subCollectionSnapshot => {
                  subCollectionSnapshot.forEach(subDoc => {
                     totals += parseFloat(subDoc.data().income);
                  });
                  commit(STORE_INCOME_GET_TOTAL, totals);
                  resolve();
               }).catch(() => {
                  reject();
               });
         }
      }
   }
};

const mutations = {
   [STORE_INCOME_GET_DOC_ID]: (state, payload) => {
      state.docId = payload;
   },
   [STORE_INCOME_RESET_DOC_ID]: state => {
      state.docId = null
   },
   [STORE_INCOME_GET_TOTAL]: (state, payload) => {
      // console.log(payload);
      state.totalIncome = payload;
   }
};

export default {
   state,
   getters,
   actions,
   mutations
}