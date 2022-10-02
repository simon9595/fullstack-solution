<template>
<h1>User control panel</h1><br >
<h2>Change password</h2>
<form enctype="multipart/form-data" @submit.prevent="checkPasswords">
  <label for="password">New password</label><br>
  <input v-model="password1" type="password"><br>
  <label for="password">Repeat new password</label><br>
  <input v-model="password2" type="password"><br>
  <p v-bind:class="{ 'bg-danger': shortPassword}">Password must be at least 8 characters long</p>
  <p class="bg-danger" v-if="passwordDifference">Passwords do not match.</p>
  <input class="btn btn-secondary" type="submit" value="Submit">
</form><br >

<h2>Account deletion</h2>
<form @submit.prevent="deleteAccount">
  <label for="password">Password</label><br>
  <input type="password" v-model="password" required><br>
  <input type="checkbox" required v-model="certain">I understand this action is permanent and wish to delete my account<br>
  <input class="btn btn-danger" type="submit" value="Delete my account">
</form>
<router-link to="/newsfeed">Return to Newsfeed</router-link>
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
      password: null,
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
        const formData = new FormData();
        formData.append('userId', this.$store.state.userData.userId)
        formData.append('password', this.password1)
        axios.put("http://localhost:3000/api/user/" + this.$store.state.userData.userId, formData, {headers: {
          Authorization: 'Bearer ' + this.$store.state.userData.token
        }})
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
      if(this.password != null && this.certain) {
        const headers = {
          'Authorization': 'Bearer ' + this.$store.state.userData.token
        }
        const data = {
          userId: this.$store.state.userData.userId,
          password: this.password
        }
        console.log('account deletion proceed')
        axios.delete("http://localhost:3000/api/user/" + this.$store.state.userData.userId, {headers, data}
        )
        .then(response => {
          console.log(response)
          alert('Account has been deleted')
          localStorage.clear();
          this.$store.commit('loginData', [undefined])
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
          alert('Password mismatch')
          })
      } else {
        console.log("Something went wrong")
      }
    }
  },
}
</script>