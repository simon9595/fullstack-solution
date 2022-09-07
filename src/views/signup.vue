<template>
  <div class="signup">
    <img id="logo-left" src="../assets/icon-left-font.png" alt="groupomania logo" />
    <h1>Sign up</h1>
    <form @submit.prevent="addUser">
      <label for="email">E-mail address</label><br />
      <input v-model="email" required /><br />
      <p class="signup-instructions">E-mail must be a valid address, e.g. email@example.com</p>
      <label for="username">Username</label><br />
      <input type="text" v-model="username" required /><br />
      <p class="signup-instructions">Username must contain 3-15 characters</p>
      <label for="password">Password</label><br />
      <input type="password" v-model="password" required /><br />
      <p class="signup-instructions">Password must be at least 8 characters long</p>
      <input class="submit" type="submit" value="Sign up" />
    </form>
    <p>
      Already have an account? <router-link to="/">Return to log in page</router-link>
    </p>
  </div>
</template>

<style>
#logo-left {
  height: 400px;
  width: 400px;
}
.signup-instructions {
  font-size: 0.8em;
  align: left;
}
</style>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      email: null,
      username: null,
      password: null,
    };
  },
  methods: {
    // validateEmail() {
    //   const regexEmail = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{2,}\.[a-z]{2,10}$/;
    //   let correctEmail = regexEmail.test(this.email);
    //   console.log(correctEmail)},
    // const inputs = this.input
    async addUser() {
      const regexEmail = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{2,}\.[a-z]{2,10}(\.[a-z]{2,8})?$/;
      const regexUsername = /^[a-zA-Z0-9_-]{3,15}$/;
      const regexPassword = /^.{8,}$/;
      let correctEmail = regexEmail.test(this.email);
      let correctUsername = regexUsername.test(this.username);
      let correctPassword = regexPassword.test(this.password);
      console.log(correctEmail, correctUsername, correctPassword)
      if(correctEmail && correctUsername && correctPassword) {
        await axios.post("http://localhost:3000/api/user/signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .then(response => {
        console.log(response)
        alert('Your account has been created.')
        this.$router.push('/')
        })
      .catch(error => console.error(error));
      } else {
        alert('Placeholder error message.')
      }


    },
  },
};
</script>
