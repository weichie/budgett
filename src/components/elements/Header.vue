<template>
   <header>
      <router-link to="/" class="logo">Budgett</router-link>
      <h1>{{currentRoute}}</h1>
      <nav class="main-nav">
         <router-link v-if="!username" to="/login">Login</router-link>
         <router-link v-if="!username" to="/register">Register</router-link>
         <router-link v-if="username" to="/">{{username}}</router-link>
         <a href="#!" v-if="username" @click="logout">Logout</a>
      </nav>
   </header>
</template>

<script>
   import firebase from 'firebase'
   import {
      STORE_AUTH_ACTION_RESET_USERINFO,
      STORE_AUTH_ACTION_IS_LOGGED_IN
   } from '../../store/modules/authStore'
   import { STORE_INCOME_RESET_DOC_ID } from '../../store/modules/incomeStore'

   export default {
      data(){
         return{

         }
      },
      computed: {
         username(){
            return this.$store.state.authStore.activeUser.username
         },
         currentRoute(){
            return this.$route.name
         }
      },
      methods: {
         logout(){
            firebase.auth().signOut().then(() => {
               this.$store.dispatch(STORE_AUTH_ACTION_RESET_USERINFO);
               this.$store.dispatch(STORE_AUTH_ACTION_IS_LOGGED_IN, false);
               this.$store.dispatch(STORE_INCOME_RESET_DOC_ID);
               this.$router.replace('login');
            });
         }
      }   
   }
</script>

