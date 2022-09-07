<template>
  <div class="login">
    <img id="logo-top" src="../assets/icon-above-font.png" alt="groupomania logo" />
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <label for="email">E-mail</label><br />
      <input type="email" v-model="email" name="e-mail" required /><br />
      <label for="password">Password </label><br />
      <input type="password" v-model="password" name="password" required /><br />
      <input value="Log in" type="submit" />
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
  </div>
</template>

<style>
#logo-top {
  width: 400px;
  height: 400px;
}
input {
  margin: 0.2em;
}
</style>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      await axios.post("http://localhost:3000/api/user/login", {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        this.$router.push('/newsfeed')
      })
      .catch(error => console.error(error));
    },
  },
};
</script>
