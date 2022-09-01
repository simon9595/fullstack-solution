<template>
  <div class="login">
    <img id="logo-top" src="../assets/icon-above-font.png" alt="groupomania logo" />
    <h1>Login</h1>
    <form>
      <label for="email">E-mail:</label><br />
      <input type="text" v-model="email" name="e-mail" required /><br />
      <label for="password">Password</label><br />
      <input type="password" v-model="password" name="password" required /><br />
      <input v-on:click="login()" value="Log in" type="submit" />
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
      let result = await axios.post("http://localhost:3000/api/user/login", {
        email: this.email,
        password: this.password,
      });
      console.warn(result);
    },
  },
};
</script>
