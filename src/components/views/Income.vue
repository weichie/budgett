<template>
   <div class="container">
      <h2>Manage your income.</h2>
      
      <div class="panel-row">
         <div class="panel semi">
            <div class="panel-header">
               <h4 class="toUpper bold">Add Income</h4>
            </div>
            <div class="panel-body">
               <form @submit.prevent="saveRecord">
                  <div class="input-group medium">
                     <input type="text" placeholder="€ 0.00" v-model="income">
                  </div>
                  <div class="input-group medium">
                     <select name="" id="" v-model="selectedCategory">
                        <option :value="category" v-for="(category, i) in categories" :key="'category_' + i">
                           {{ category }}
                        </option>
                     </select>
                  </div>
                  <div class="input-group medium">
                     <input type="text" placeholder="Payee" v-model="payee">
                  </div>
                  <div class="input-group medium">
                     <input type="text" placeholder="date" v-model="date">
                  </div>
                  <div class="input-group large">
                     <input type="text" placeholder="Location" v-model="location">
                  </div>
                  <div class="input-group large">
                     <textarea name="note" rows="4" placeholder="Note" v-model="note"></textarea>
                  </div>
                  <div class="input-group large text-right">
                     <small class="success green" v-if="successMessage">
                        {{ successMessage }}
                     </small>
                     <button @click.prevent="cancelRecord" class="btn btn-secondary">cancel</button>
                     <button class="btn btn-primary">Save record</button>
                  </div>
               </form>
            </div>
         </div>
         <div class="panel small">
            <div class="panel-header">
               <h4 class="toUpper bold">Totals</h4>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import { incomeCategories } from '../../utils'
   import firebase from 'firebase'
   import db from '../../firestore'

   export default {
      name: 'income',
      data(){
         return{
            categories: incomeCategories,
            selectedCategory: 'Salary',
            income: '',
            payee: '',
            note: '',
            date: '',
            location: '',
            successMessage: null,
            errorMessage: null
         }
      },
      methods: {
         saveRecord(){
            db.collection('income').add({
               owner: this.$store.state.authStore.activeUser.docId,
               selectedCategory: this.selectedCategory,
               income: this.income,
               payee: this.payee,
               note: this.note,
               date: this.date,
               location: this.location,
            }).then(() => {
               this.cancelRecord();
               this.successMessage = "Record added to your account!";
               setTimeout(() => {
                  this.successMessage = null;
               }, 2000);
            }).catch(err => {
               this.errorMessage = err.message;
            })
         },
         cancelRecord(){
            this.selectedCategory = 'Salary',
            this.income = '',
            this.payee = '',
            this.note = '',
            this.date = '',
            this.location = ''
         }
      }
   }
</script>
