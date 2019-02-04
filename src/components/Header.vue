<template>
   <header>
      <router-link to="/" class="logo">Budgett</router-link>
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
   import {STORE_AUTH_ACTION_RESET_USERINFO} from '../store/modules/authStore'

   export default {
      data(){
         return{

         }
      },
      computed: {
         username(){
            return this.$store.state.authStore.activeUser.username
         }
      },
      methods: {
         logout(){
            firebase.auth().signOut()
               .then(() => {
                  this.$store.dispatch(STORE_AUTH_ACTION_RESET_USERINFO);
                  this.$router.replace('login');
               });
         }
      }   
   }
</script>

