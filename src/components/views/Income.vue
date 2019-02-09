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
               <small class="total toUpper">Gross income</small>
               <span class="total">{{ totalIncome | currency }}</span>
            </div>
         </div>
      </div>

      <div class="panel-padding">
         <table class="primary-table">
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Payee</th>
                  <th>Category</th>
                  <th>Note</th>
                  <th>Location</th>
                  <th>Amount</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(record, i) in incomeRecords" :key="'income_rec_' + i">
                  <td>{{record.date}}</td>
                  <td>{{record.payee}}</td>
                  <td>{{record.category}}</td>
                  <td>{{record.note}}</td>
                  <td>{{record.location}}</td>
                  <td>{{ parseFloat(record.income) | currency }}</td>
                  <td class="text-right actions">
                     <a href="#" @click.prevent="editRecord"><i class="fas fa-pencil-alt"></i></a>
                     <a class="red" href="#" @click.prevent="deleteRecord"><i class="fas fa-trash-alt"></i></a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
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
            formErrors: [],
            incomeRecords: []
         }
      },
      mounted(){
         const owner = this.$store.getters.getUserDoc;
         let userIncomeDoc = db.collection('income').where('owner', '==', owner).get()
            .then(doc => this.$store.dispatch(STORE_INCOME_GET_DOC_ID, doc.docs[0].id))
            .catch(() => this.$store.dispatch(STORE_INCOME_RESET_DOC_ID));
         this.getRecords;
      },
      methods: {
         checkForm(e){
            const form = this.incomeData;
            if(form.income && form.date && form.payee) return true;
            this.formErrors = [];

            (!form.income) && this.formErrors.push('Income amount is required.');
            (!form.date)   && this.formErrors.push('Date is required.');
            (!form.payee)  && this.formErrors.push('Payee is required');
            if(this.formErrors.length > 0){
               return false;
            }
         },
         saveRecord(){
            if(this.checkForm()){
               return false;
            }
            const incomeDoc = this.$store.getters.getIncomeDocId;

            if(incomeDoc){
               const yearCollection = (this.incomeData.date) ? new Date(this.incomeData.date).getFullYear().toString() : new Date().getFullYear().toString();
               db.collection('income')
                 .doc(incomeDoc)
                 .collection(yearCollection)
                 .add(this.incomeData).then(() => {
                     this.successMessage = 'Record added to your account!';
                     this.cancelRecord();
                  }).catch(err => {
                     this.errorMessage = err.message;
                  });
            }else{
               const owner = this.$store.getters.getUserDoc;
               const yearCollection = (this.incomeData.date) ? new Date(this.incomeData.date).getFullYear().toString() : new Date().getFullYear().toString();

               db.collection('income').add({
                  owner
               }).then(newIncomeDoc => {
                  db.collection('income')
                  .doc(newIncomeDoc.id)
                  .collection(yearCollection)
                  .add(this.incomeData).then(() => {
                        this.successMessage = 'Record added to your account!';
                        this.cancelRecord();
                     }).catch(err => {
                        this.errorMessage = err.message;
                     });
               }).catch(err => {
                  console.log('Something went wrong: ' + err);
               });
            }
         },
         cancelRecord(){
            this.incomdeData.selectedCategory = 'Salary',
            this.incomdeData.income = '',
            this.incomdeData.payee = '',
            this.incomdeData.note = '',
            this.incomdeData.date = '',
            this.incomdeData.location = ''
         },
         deleteRecord(){
            console.log('Deleting record...');
         },
         editRecord(){
            console.log('Edit record...');
         }
      },
      computed: {
         getRecords(){
            //Rewrite when getCollections() is live...
            const incomeCollection = `income/${this.$store.getters.getIncomeDocId}`
            const years = ['2018','2019'];

            for(let year of years){
               db.collection(incomeCollection + '/' + year)
               .get()
               .then(subCollectionSnapshot => {
                  subCollectionSnapshot.forEach(subDoc => {
                     this.incomeRecords.push(subDoc.data());
                  });
               }).catch(err => {
                  this.errorMessage = err.message
               });
            }            
         },
         totalIncome(){
            let totalIncome = 0;

            this.incomeRecords.map(record => {
               totalIncome += parseFloat(record.income);
            });

            return totalIncome;
         }
      }
   }
</script>
