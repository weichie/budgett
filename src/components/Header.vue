<template>
   <header>
      <router-link to="/" class="logo">Home</router-link>
      <nav class="main-nav">
         <router-link to="/login">Login</router-link>
         <router-link to="/register">Register</router-link>
         <a href="#!" @click="logout">Logout</a>
      </nav>
   </header>
</template>

<script>
   import firebase from 'firebase'

   export default {
      data(){
         return{

         }
      },
      methods: {
         logout(){
            firebase.auth().signOut()
               .then(() => {
                  this.$router.replace('login');
               });
         }
      }   
   }
</script>

