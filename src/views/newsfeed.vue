<template>

<navbar />
<div class="container" id="newsfeed">
<p class="mt-2">You are logged in as <strong>{{ $store.state.userData.username }}</strong></p>
<newpost />
<post />

</div>
</template>

<style>
  #newsfeed{
    max-width: 750px;
  }
</style>

<script>
import axios from "axios"
import newpost from "../components/newpost.vue"
import post from "../components/post.vue"
import navbar from "../components/navbar.vue"
export default {
  name: 'App',
  data() {
    return {
      posts: [],
    }
  },
  components: {
    newpost,
    post,
    navbar
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