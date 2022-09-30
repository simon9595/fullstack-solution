<template>

<nav>
<router-link to="/control">User control panel</router-link>
<button @click="logout()" class="mx-4" type="button">Logout</button>
</nav>
<p>You are logged in as {{ $store.state.userData.username }}</p>

<newpost />
<div class="border mt-4" v-for="post in posts" v-bind:key="post.id">
<button class="btn btn-outline-secondary mx-2" @click="editPost(postData = post)" v-if="post.User.username == this.$store.state.userData.username">Edit</button> <!-- change this to a ... dropdown menu -->
<button type="button" class="btn btn-outline-danger" @click="deletePost()" v-if="post.User.username == this.$store.state.userData.username || this.$store.state.userData.isAdmin == true">Delete</button>
<p>{{ post.User.username }}</p>
<p>{{ post.createdAt }}</p>
<p v-if="post.createdAt !== post.updatedAt">Edited:{{ post.updatedAt }}</p>
<p>{{ post.text }}</p>
<img v-if="post.attachment" v-bind:src="post.attachment">
<p>{{ post.likes }} likes <!--{{ post.comments }}--> 0 comments</p> <!-- fix the comments so it displays the length -->
<button class="btn btn-outline-primary" @click="postLike(postId = post.id)">Like</button>
<button class="btn btn-outline-secondary">Comment</button>
</div>

</template>

<style>

</style>

<script>
import axios from "axios"
import newpost from "../components/newpost.vue"
export default {
  name: 'App',
  data() {
    return {
      posts: [],
    }
  },
  components: {
    newpost,
  },
  methods: {
    editPost(postData){
      let postDataString = JSON.stringify(postData)
      localStorage.setItem('postDataString', postDataString)
      this.$router.push('/edit')      
    },
    cancelEdit(){
      this.editingPost = false;
      console.log(this.editingPost)
    },
    deletePost(){
      console.log('Delete post')
      alert('Sure?')
    },
    postLike(postId){
      console.log(postId)
      axios.post("http://localhost:3000/api/post/" + postId + "/like", {
        id: postId,
        userId: this.$store.state.userData.userId
      })
      .then(response => {
        console.log(response)
      }).catch(error => console.error(error));
    },
    logout(){
      console.log('Logging out')
      localStorage.clear();
      window.location.reload()
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
}, mounted() {
  axios.get("http://localhost:3000/api/post", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      this.posts = response.data; 
    console.log(this.posts)})
    .catch(error => console.error(error))
  },
}
</script>