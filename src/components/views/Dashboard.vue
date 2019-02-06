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
               {{ income_budget }}
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
               {{ expense_budget }}
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
               {{ worth_budget }}
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
               {{ savings_budget }}
            </div>
         </div>
      </div>

      <ul>
         <li>Reminders (payments / toDo's / Priorities / follow-ups / ...)</li>
         <li>Subscribtions (when does a client need to pay for hosting etc.)</li>
         <li>Fast add income/expense</li>
      </ul>
   </div>
</template>

<script>
   import firebase from 'firebase'

   export default {
      name: 'dashboard',
      computed: {
         income_budget(){
            return 8453.84.toFixed(2)
         },
         expense_budget(){
            return 1647.23.toFixed(2)
         },
         worth_budget(){
            return (this.income_budget - this.expense_budget).toFixed(2)
         },
         savings_budget(){
            return 3500.83.toFixed(2)
         }
      }
   }
</script>
