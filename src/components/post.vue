<template>
  <div class="border mt-4" v-for="post in posts" v-bind:key="post.id">
    <button class="btn btn-outline-secondary mx-2" @click="editPost(postData = post)" v-if="post.User.username == this.$store.state.userData.username">Edit</button> <!-- change this to a ... dropdown menu -->
    <button type="button" class="btn btn-outline-danger" @click="deletePost(postId = post.id)" v-if="post.User.username == this.$store.state.userData.username || this.$store.state.userData.isAdmin == true">Delete</button>
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
  }, 
  mounted() {
    this.getAllPosts()
  },

}
</script>