<template>

<nav>
  <router-link to="/control">User control panel</router-link>
  <button @click="logout()" class="mx-4" type="button">Logout</button>
</nav>
<p>You are logged in as <strong>{{ $store.state.userData.username }}</strong></p>
<newpost />
<post />


</template>

<style>

</style>

<script>
import axios from "axios"
import newpost from "../components/newpost.vue"
import post from "../components/post.vue"
export default {
  name: 'App',
  data() {
    return {
      posts: [],
      postsKey: 0,
      newPostKey: 0,
    }
  },
  components: {
    newpost,
    post
  },
  methods: {
    logout(){
      console.log('Logging out')
      localStorage.clear();
      this.$store.commit('loginData', [undefined])
      this.$router.push('/')
    },
  },
  beforeMount() {
    if(this.$store.state.userData.token == undefined) {
      console.log(localStorage)
      if(localStorage.getItem('userId') != undefined) {
        axios.get("http://localhost:3000/api/user/" + localStorage.getItem('userId'))
        .then(response => {
          this.$store.commit('loginData', [localStorage.getItem('userId'), response.data.username, response.data.email, response.data.isAdmin, localStorage.getItem('token')])
        })
        .catch(error => console.log(error))
      } else {
      this.$router.push('/')
    }}
  }
}
</script>