<template>
   <div class="container">
      <h2>Welcome, {{ this.$store.state.authStore.activeUser.username }}!</h2>

   </div>
</template>

<script>
   import firebase from 'firebase'

   export default {
      name: 'dashboard',
      data(){
         return{
            
         }
      },
   }
</script>
