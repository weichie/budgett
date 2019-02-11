<template>
   <div class="container">
      <h2>Welcome, {{ this.$store.state.authStore.activeUser.username }}!</h2>
      
      <div class="panel-row">
         <div class="panel">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-chart-line"></i>
                  Income
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               {{ incomeBudget }}
            </div>
         </div>
         <div class="panel">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-level-down-alt"></i>
                  Expenses
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               {{ expenseBudget }}
            </div>
         </div>
         <div class="panel">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-rocket"></i>
                  Net Worth
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               {{ worthBudget }}
            </div>
         </div>
         <div class="panel">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-hand-holding-usd"></i>
                  Savings
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               {{ savingsBudget }}
            </div>
         </div>
      </div>

      <ul>
         <li v-for="(log, i) in userLogs" :key="'userlog_' + i">
            <span class="action" v-if="log.action === 'add'">
               <strong>Added</strong> a new record to <strong>{{log.type}}</strong>
            </span>
         </li>
      </ul>

      <ul>
         <li>Reminders (payments / toDo's / Priorities / follow-ups / ...)</li>
         <li>Subscribtions (when does a client need to pay for hosting etc.)</li>
         <li>Fast add income/expense</li>
      </ul>
   </div>
</template>

<script>
   import firebase from 'firebase'
   import db from '../../firestore'
   import { 
      STORE_INCOME_GET_DOC_ID, 
      STORE_INCOME_RESET_DOC_ID,
      STORE_INCOME_GET_TOTAL
   } from '../../store/modules/incomeStore'

   export default {
      name: 'dashboard',
      data(){
         return{
            userLogs: [],
            logError: null
         }
      },
      created(){
         if(this.$store.getters.getIncomeDocId === null){
            setTimeout(() => {
               const owner = this.$store.getters.getUserDoc;
               let userIncomeDoc = db.collection('income').where('owner', '==', owner).get()
                  .then(doc => this.$store.dispatch(STORE_INCOME_GET_DOC_ID, doc.docs[0].id))
                  .catch(() => this.$store.dispatch(STORE_INCOME_RESET_DOC_ID));
            }, 500);
         }
         setTimeout(() => {
            this.$store.dispatch(STORE_INCOME_GET_TOTAL);
         }, 600);
         this.getLogs;
      },
      computed: {
         incomeBudget(){
            return this.$store.getters.getTotalIncome
         },
         expenseBudget(){
            return 1647.23.toFixed(2)
         },
         worthBudget(){
            return (this.incomeBudget - this.expenseBudget).toFixed(2)
         },
         savingsBudget(){
            return 3500.83.toFixed(2)
         },
         getLogs(){
            const logCollection = `users/${this.$store.getters.getUserDoc}/logs`;
            db.collection(logCollection)
              .get()
              .then(snapShot => {
                 snapShot.forEach(log => this.userLogs.push(log.data()));
              })
              .catch(err => {
                 this.logError = err.message
              })
         }
      },
   }
</script>
