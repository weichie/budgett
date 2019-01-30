<template>
   <div class="container">
      <h1>Home Component</h1>
      <p>Welcome {{ user }}</p>
   </div>
</template>

<script>
   export default {
      name: 'home',
      data(){
         return{
            user: this.$store.state.authStore.testUser
         }
      }
   }
</script>
