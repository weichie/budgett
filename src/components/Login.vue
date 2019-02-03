<template>
   <div class="container">
      <h1>Login Component</h1>
      <form @submit.prevent="login()">
         <input type="email" placeholder="email" v-model="email" />
         <input type="password" placeholder="password" v-model="password" />
         <button>Add</button>
      </form>

      <ul class="names">
         <li v-for="user of users" :key="user['.key']">
            <strong>{{ user.username }}: </strong>
            {{ user.firstname }}
            {{ user.lastname }} - 
            {{ user.email }}
         </li>
      </ul>
   </div>
</template>

<script>
   import db from "../firestore";

   export default {
      name: 'login',
      data(){
         return{
            email: '',
            password: '',
            users: []
         }
      },
      mounted(){
         db.collection('users').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
               this.users.push(doc.data());
            });
         });
      },
      methods: {
         login(){
            
         }
      }
   }
</script>
