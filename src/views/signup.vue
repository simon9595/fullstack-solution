<template>
  <div class="container">
    <img class="img-fluid" src="../assets/icon-left-font.png" alt="groupomania logo" />
    <h1>Sign up</h1>
    <form @submit.prevent="addUser" class="card-body mx-auto" style="max-width: 400px">
      <label class="form-label col-form-label-md" for="email">E-mail address</label><br />
      <input class="form-control form-control-md" v-model="email" @blur="validateEmail" required /><br />
      <p class="form-text">E-mail must be a valid address, e.g. email@example.com</p>
      <label class="form-label col-form-label-md" for="username">Username</label><br />
      <input class="form-control form-control-md" type="text" v-model="username" required /><br />
      <p class="form-text">Username must contain 3-15 characters</p>
      <label class="form-label col-form-label-md" for="password">Password</label><br />
      <input class="form-control form-control-md" type="password" @blur="passwordLength(password = this.password)" v-model="password" required /><br />
      <p class="form-text">Password must be at least 8 characters long</p>
      <input class="btn btn-primary form-control form-control-md" type="submit" value="Sign up" />
    </form>
    
    <p>
      Already have an account? <router-link to="/">Return to log in page</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      email: null,
      username: '',
      password: null,
    };
  },
  methods: {
    validateEmail() {
      const regexEmail = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{2,}\.[a-z]{2,10}$/;
      let correctEmail = regexEmail.test(this.email);
      console.log(correctEmail)},

    passwordLength(password) {
      const regexPassword = /^.{8,}$/;
      let correctPassword = regexPassword.test(password)
      console.log(correctPassword)
    },
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
      .catch(error => {
        console.error(error) 
        alert('Email or username already in use')
        });
      } else {
        alert('Please make sure the registration form is filled out properly.')
      }


    },
  },
};
</script>
