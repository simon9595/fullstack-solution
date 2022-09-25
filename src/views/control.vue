<template>
<router-link to="/newsfeed">Return to Newsfeed</router-link>
<p>Change password</p>
<form @submit.prevent="checkPasswords">
  <label for="password">New password</label><br>
  <input v-model="password1" type="password"><br>
  <label for="password">Repeat new password</label><br>
  <input v-model="password2" type="password"><br>
  <p v-bind:class="{ 'bg-danger': shortPassword}">Password must be at least 8 characters long</p>
  <p class="bg-danger" v-if="passwordDifference">Passwords do not match.</p>
  <input type="submit" value="Submit">
</form>

<p>Account deletion</p>
<form @submit.prevent="deleteAccount">
  <label for="email">E-mail</label><br>
  <input v-model="email" required><br>
  <input type="checkbox" required v-model="certain">I understand this action is permanent and wish to delete my account<br>
  <input type="submit" value="Delete my account">
</form>
</template>

<script>
import axios from "axios"
export default {
  name: "Controls",
  data() {
    return {
      passwordDifference: false,
      correctPassword: false,
      shortPassword: false,
      certain: false,
      email: null,
      password1: null,
      password2: null
    }
  },
  methods: {
    checkPasswords(){
      const regexPassword = /^.{8,}$/;
      if(this.password1 !== this.password2) {
        console.log('WRONG!')
        return this.passwordDifference = true
      } else {
        let correctPassword = regexPassword.test(this.password1, this.password2)
        console.log(correctPassword)
        if(!correctPassword){
          return this.shortPassword = true;
        }
        axios.put("http://localhost:3000/api/user/" + this.$store.state.userData.userId, {
          userId: this.$store.state.userData.userId,
          password: this.password1
        })
        .then(response => {
          console.log(response)
          alert('Password has been changed!')
          this.$router.push('/newsfeed')
        })
        .catch(error => console.log(error))
      }
    },
    deleteAccount(){
      console.log(this.email, this.$store.state.userData.email, this.certain)
      // make sure the password is the actual user password
      if(this.email == this.$store.state.userData.email && this.certain) {
        console.log('account deletion proceed')
        axios.delete("http://localhost:3000/api/user/" + this.$store.state.userData.userId, {
          userId: this.$store.state.userData.userId, //delete requests do not take body
          password: this.password
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
      } else {
        console.log("Email difference")
      }
    }
  },
}
</script>