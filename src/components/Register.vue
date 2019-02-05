<template>
   <div class="container auth-container">
      <h2>Register a new account!</h2>

      <div class="register-panel">
         <p class="error-message" v-show="this.errorMessage">{{errorMessage}}</p>

         <form @submit.prevent="registerUser()" class="auth-form">
            <div class="input-group medium">
               <input type="text" v-model="accountInfo.firstname" placeholder="Firstname" autocomplete="off" />
            </div>
            <div class="input-group medium">
               <input type="text" v-model="accountInfo.lastname" placeholder="Lastname" autocomplete="off" />
            </div>
            <div class="input-group large">
               <input type="text" v-model="accountInfo.username" placeholder="Username" autocomplete="off" />
            </div>
            <div class="input-group large">
               <input type="email" v-model="accountInfo.email" placeholder="Email" autocomplete="off" />
            </div>
            <div class="input-group large">
               <input type="password" v-model="accountInfo.password" placeholder="Password" autocomplete="off" />
            </div>
            <div class="input-group large">
               <button class="btn btn-block btn-primary">Create account</button>
            </div>
         </form>

         <small>Already have an account? <router-link to="/login">Login</router-link></small>
      </div>
   </div>
</template>

<script>
   import firebase from 'firebase'
   import db from '../firestore'

   export default {
      name: 'register',
      data(){
         return{
            accountInfo: {
               firstname: '',
               lastname: '',
               username: '',
               email: '',
               password: '',
               active: 1,
               isAdmin: false
            },
            errorMessage: null
         }
      },
      methods: {
         registerUser(){
            firebase.auth().createUserWithEmailAndPassword(this.accountInfo.email, this.accountInfo.password)
               .then(() => {
                  firebase.auth().currentUser.updateProfile({
                     displayName: this.accountInfo.username
                  }).then(() => {
                     db.collection('users').add({
                        firstname: this.accountInfo.firstname,
                        lastname: this.accountInfo.lastname,
                        username: this.accountInfo.username,
                        email: this.accountInfo.email,
                        isAdmin: this.accountInfo.isAdmin,
                        active: this.accountInfo.active
                     }).then(() => {
                        this.$router.replace('dashboard');
                     }).catch(err => {
                        this.errorMessage = err.message;
                     });
                  }).catch(err => {
                     this.errorMessage = err.message;
                  });
               }).catch(err => {
                  this.errorMessage = err.message
               });
         }
      }
   }
</script>
