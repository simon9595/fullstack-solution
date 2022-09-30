<template>

  <div class="container">
    <img class="img-fluid" id="logo-top" src="../assets/icon-above-font.png" alt="groupomania logo" />
    <h1>Login</h1>
    <form @submit.prevent="login()" class="card-body mx-auto" style="max-width: 300px">
      <label class="form-label" for="email">E-mail</label><br />
      <input class="form-control" type="email" v-model="email" name="e-mail" required /><br />
      <label class="form-label" for="password">Password </label><br />
      <input class="form-control" type="password" v-model="password" name="password" required /><br />
      <input class="btn btn-block btn-primary w-50" value="Log in" type="submit" />
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
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('token', response.data.token)
        this.$store.commit('loginData', [response.data.userId, response.data.username, response.data.email, response.data.isAdmin, response.data.token])
        this.$router.push('/newsfeed')
      })
      .catch(error => console.error(error));
    },
}
}
</script>
