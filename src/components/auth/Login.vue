<template>
   <div class="container auth-container">
      <h2>Login</h2>
      <p class="error-message" v-show="errorMessage">{{errorMessage}}</p>
      <form @submit.prevent="login()" class="auth-form">
         <div class="input-group large">
            <input type="email" placeholder="email" v-model="email" autocomplete="email" />
         </div>
         <div class="input-group large">
            <input type="password" placeholder="password" v-model="password" autocomplete="current-password" />
         </div>
         <div class="input-group large">
            <button class="btn btn-block btn-primary">Login</button>
         </div>
      </form>
      <small>Not yet an account? <router-link to="/register">Create one</router-link></small>
   </div>
</template>

<script>
   import {STORE_AUTH_ACTION_GET_USERINFO} from '../../store/modules/authStore'
   import firebase from 'firebase';
   import db from "../../firestore";

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
                  this.errorMessage = err.message
               });
         }
      }
   }
</script>
