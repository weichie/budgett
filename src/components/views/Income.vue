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
                     <input type="text" placeholder="€ 0.00" v-model="incomeData.income">
                  </div>
                  <div class="input-group medium">
                     <select name="" id="" v-model="incomeData.category">
                        <option :value="category" v-for="(category, i) in categories" :key="'category_' + i">
                           {{ category }}
                        </option>
                     </select>
                  </div>
                  <div class="input-group medium">
                     <input type="text" placeholder="Payee" v-model="incomeData.payee">
                  </div>
                  <div class="input-group medium">
                     <input type="date" placeholder="date" v-model="incomeData.date">
                  </div>
                  <div class="input-group large">
                     <input type="text" placeholder="Location" v-model="incomeData.location">
                  </div>
                  <div class="input-group large">
                     <textarea name="note" rows="4" placeholder="Note" v-model="incomeData.note"></textarea>
                  </div>
                  <div class="input-group large text-right">
                     <small class="success green" v-if="successMessage">
                        {{ successMessage }}
                     </small>
                     <small class="success green" v-if="errorMessage">
                        {{ errorMessage }}
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

      <ul>
         <li>test</li>
      </ul>

   </div>
</template>

<script>
   import { incomeCategories } from '../../utils'
   import firebase from 'firebase'
   import db from '../../firestore'
   import { STORE_INCOME_GET_DOC_ID, STORE_INCOME_RESET_DOC_ID } from '../../store/modules/incomeStore'

   export default {
      name: 'income',
      data(){
         return{
            categories: incomeCategories,
            incomeData: {
               category: 'Salary',
               income: '',
               payee: '',
               note: '',
               date: '',
               location: '',
            },
            successMessage: null,
            errorMessage: null,
            incomeRecords: []
         }
      },
      mounted(){
         const owner = this.$store.getters.getUserDoc;
         let userIncomeDoc = db.collection('income').where('owner', '==', owner).get()
            .then(doc => this.$store.dispatch(STORE_INCOME_GET_DOC_ID, doc.docs[0].id))
            .catch(() => this.$store.dispatch(STORE_INCOME_RESET_DOC_ID));
      },
      methods: {
         saveRecord(){
            const incomeDoc = this.$store.getters.getIncomeDocId;

            if(incomeDoc){
               const yearCollection = new Date().getFullYear().toString();
               db.collection('income')
                 .doc(incomeDoc)
                 .collection(yearCollection)
                 .add(this.incomeData).then(() => {
                     this.successMessage = 'Record added to your account!';
                  }).catch(err => {
                     this.errorMessage = err.message;
                  });
            }else{
               const owner = this.$store.getters.getUserDoc;
               const yearCollection = new Date().getFullYear().toString();

               db.collection('income').add({
                  owner
               }).then(newIncomeDoc => {
                  db.collection('income')
                  .doc(newIncomeDoc.id)
                  .collection(yearCollection)
                  .add(this.incomeData).then(() => {
                        this.successMessage = 'Record added to your account!';
                     }).catch(err => {
                        this.errorMessage = err.message;
                     });
               }).catch(err => {
                  console.log('Something went wrong: ' + err);
               });
            }
         },
         cancelRecord(){
            this.selectedCategory = 'Salary',
            this.income = '',
            this.payee = '',
            this.note = '',
            this.date = '',
            this.location = ''
         },
         
      },
      computed: {
         // getRecords(){
         //    db.collection("income").where("owner", "==", this.$store.state.authStore.activeUser.docId)
         //       .get()
         //       .then(querySnapshot => {
         //          querySnapshot.forEach(doc => {
         //             this.incomeRecords.push(doc.data());
         //          });
         //          // console.log(this.incomeRecords);
         //       })
         //       .catch(function(error) {
         //          // console.log("Error getting documents: ", error);
         //       });
         // }
      }
   }
</script>
