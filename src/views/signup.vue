<template>
  <div class="signup">
    <img id="logo-left" src="../assets/icon-left-font.png" alt="groupomania logo">
    <h1>Sign up</h1>
    <form>
      <label for="email">E-mail address</label><br>
      <input type="email" v-model="email" required><br>
      <label for="username">Username</label><br>
      <input type="text" v-model="username" required><br>
      <label for="password">Password</label><br>
      <input type="password" v-model="password" required><br>
      <input v-on:click="addUser()" class="submit" type="submit" value="Sign up">
    </form>
  </div>
</template>

<style>
#logo-left {
  height: 400px;
  width: 400px;
}
</style>

<script>
import axios from 'axios'
export default {
  name: "App",
  data(){
    return{
      email:'',
      username:'',
      password:'',
    }
  },
  methods:{
    async addUser(){
      let result = await axios.post("http://localhost:3000/api/user/signup",{
        username: this.username,
        email:this.email,
        password: this.password
      })
      console.warn(result)
    }
  }
}
</script>