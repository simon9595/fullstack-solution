<template>
<!-- New post -->
  <div class="container bg-light rounded">
    <h2>Compose new post</h2>
    <form enctype="multipart/form-data" @submit.prevent="publish">
        <textarea class="form-control" v-model="text"></textarea> <br />
      <div class="d-sm-flex justify-content-between row">
        <div class="col-md-8">
          <label for="file">Choose file to upload</label> <br />
          <input class="btn btn-secondary form-control" @change="uploadFile" ref="attachment" type="file" accept="image/*">
        </div>
        <input class="btn col btn-primary align-self-end form-control" id="submit-button" type="submit" value="Pubish">
      </div>
    </form>  
  </div>

<!-- Render all posts -->
  <div class="border mt-4 mb-3 container rounded" v-for="post in posts" v-bind:key="post.id">
    <div class="d-flex justify-content-end mt-2">
      <button class="btn btn-outline-secondary mx-2" @click="editPost(postData = post)" v-if="post.User.username == this.$store.state.userData.username">Edit</button> <!-- change this to a ... dropdown menu -->
      <button type="button" class="btn btn-outline-danger mx-2" @click="deletePost(postId = post.id)" v-if="post.User.username == this.$store.state.userData.username || this.$store.state.userData.isAdmin == true">Delete</button>
    </div>
    <div>
    <p class="bg-info mt-1" v-if="post.Seen == null || !post.Seen.seen">NEW!</p>
    <p>{{ post.User.username }}</p>
    <p class="text-end text-secondary">Posted {{ moment(post.createdAt).fromNow() }}</p>
    <p class="text-end text-secondary" v-if="post.createdAt !== post.updatedAt">Edited {{ moment(post.updatedAt).fromNow() }}</p>
    <p>{{ post.text }}</p>
    <img class="img-fluid mb-4" v-if="post.attachment" v-bind:src="post.attachment">
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  data() {
    return {
      text: '',
      attachment: null,
      moment: moment,
      posts: [],
      postKey: 0
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
        this.getAllPosts()
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
    },
    async publish() {
      if(this.text == '' && this.attachment == null){
        alert('Cannot publish an empty post')
      } else {
      const formData = new FormData();
      formData.append('userId', this.$store.state.userData.userId)
      formData.append('text', this.text)
      formData.append('attachment', this.attachment)
      await axios.post('http://localhost:3000/api/post/publish', formData, {headers: {
        Authorization: 'Bearer ' + this.$store.state.userData.token
      }})
      .then(response => {
      console.log(response)
      alert('Your post has been published')
      this.$refs.attachment.value = null;
      this.text = ''
      this.attachment = null
      this.getAllPosts();
      this.seen()
    }).catch(error => console.error(error));
    }},
  uploadFile() {
    console.log('File selected')
    this.attachment = this.$refs.attachment.files[0];
    console.log(this.attachment, this.$refs.attachment.files[0])
  }
  },

  mounted() {
    this.getAllPosts()
    this.seen()
  },

}
</script>