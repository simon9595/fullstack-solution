<template>
  <div class="border mt-4 mb-3 container rounded" v-for="post in posts" v-bind:key="post.id">
    <div class="d-flex justify-content-end mt-2">
      <button class="btn btn-outline-secondary mx-2" @click="editPost(postData = post)" v-if="post.User.username == this.$store.state.userData.username">Edit</button> <!-- change this to a ... dropdown menu -->
      <button type="button" class="btn btn-outline-danger mx-2" @click="deletePost(postId = post.id)" v-if="post.User.username == this.$store.state.userData.username || this.$store.state.userData.isAdmin == true">Delete</button>
    </div>
    <div>
    <p class="bg-info" v-if="post.Seen == null || !post.Seen.seen">NEW!</p>
    <p>{{ post.User.username }}</p>
    <p>{{ post.createdAt }}</p>
    <p v-if="post.createdAt !== post.updatedAt">Edited:{{ post.updatedAt }}</p>
    <p>{{ post.text }}</p>
    <img class="img-fluid mb-4" v-if="post.attachment" v-bind:src="post.attachment">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: []
    }
  },
  methods: {
    getAllPosts(){
      axios.get("http://localhost:3000/api/post", { headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }})
    .then(response => {
      this.posts = response.data; 
    console.log(this.posts)})
    .catch(error => console.error(error))},
    editPost(postData){
    let postDataString = JSON.stringify(postData)
    localStorage.setItem('postDataString', postDataString)
    this.$router.push('/edit')      
    },
    deletePost(postId){
      console.log(postId)
      axios.delete("http://localhost:3000/api/post/" + postId, {headers: {
        Authorization: 'Bearer ' + this.$store.state.userData.token
      }} )
      .then(() => {
        alert('Post has been deleted')
        this.$router.go()
      }).catch(error => {
        console.log(error)
        alert('Something went wrong')
      })
    },
    seen(){
      console.log('Seen')
      axios.post("http://localhost:3000/api/post/seen", {
        userId: localStorage.getItem('userId')
      }, {headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }})
    }
  },

  mounted() {
    this.getAllPosts()
    this.seen()
  },

}
</script>