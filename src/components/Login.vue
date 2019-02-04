<template>
   <div class="container">
      <h1>Login Component</h1>
      <h3 v-show="errorMessage">{{errorMessage}}</h3>
      <form @submit.prevent="login()">
         <input type="email" placeholder="email" v-model="email" autocomplete="email" />
         <input type="password" placeholder="password" v-model="password" autocomplete="current-password" />
         <button>Add</button>
      </form>
   </div>
</template>

<script>
   import {STORE_AUTH_ACTION_GET_USERINFO} from '../store/modules/authStore'
   import firebase from 'firebase';
   import db from "../firestore";

   export default {
      name: 'login',
      data(){
         return{
            email: '',
            password: '',
            errorMessage: null,
         }
      },
      methods: {
         login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
               .then(user => {
                  this.$router.replace('dashboard');
               }).catch(err => {
                  console.error(err);
               });
         }
      }
   }
</script>
