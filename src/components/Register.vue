<template>
   <div class="container">
      <h1>Register your account!</h1>
      <h3 v-show="this.errorMessage">{{errorMessage}}</h3>

      <div class="register-panel" v-if="!success">
         <form @submit.prevent="registerUser()">
            <input type="text" v-model="accountInfo.firstname" placeholder="Firstname" autocomplete="off" /><br>
            <input type="text" v-model="accountInfo.lastname" placeholder="Lastname" autocomplete="off" /><br>
            <input type="text" v-model="accountInfo.username" placeholder="Username" autocomplete="off" /><br>
            <input type="email" v-model="accountInfo.email" placeholder="Email" autocomplete="off" /><br>
            <input type="password" v-model="accountInfo.password" placeholder="Password" autocomplete="off" /><br>
            <button>Register</button>
         </form>
         Already have an account? <router-link to="/login">Login</router-link>
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
            },
            errorMessage: null
         }
      },
      methods: {
         registerUser(){
            console.log(this.accountInfo.email, this.accountInfo.password);

            firebase.auth().createUserWithEmailAndPassword(this.accountInfo.email, this.accountInfo.password)
               .then(user => {
                  firebase.auth().currentUser.updateProfile({
                     displayName: this.accountInfo.username
                  }).then(user => {
                     const displayName = firebase.auth().currentUser.displayName;
                     db.collection('users').add({
                        firstname: this.accountInfo.firstname,
                        lastname: this.accountInfo.lastname,
                        username: this.accountInfo.username,
                        email: this.accountInfo.email
                     }).then(docRef => {
                        this.$router.replace('dashboard');
                     }).catch(err => {
                        this.errorMessage = err.message;
                        console.warn('Whoops, something went wrong:', err);
                     });
                  }).catch(err => {
                     this.errorMessage = err.message;
                     console.log(err.message);
                  });
               }).catch(err => {
                  this.errorMessage = err.message
                  console.error(err.message);
               });
         }
      }
   }
</script>
