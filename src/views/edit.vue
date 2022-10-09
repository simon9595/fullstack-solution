<template>
  <div class="container mt-1" id="edit-post">
  <h1>Editing post</h1>
    <form enctype="multipart/form-data" @submit.prevent="submitEdit()">
      <textarea class="form-control" type="textarea" v-model="this.postEdit"></textarea><br>
      <div class="d-flex justify-content-around">
        <button class="btn btn-secondary mx-2 form-control" @click="cancel()" type="button">Cancel</button>
        <button class="btn btn-primary form-control" type="submit">Publish</button>
      </div>
    </form>
  </div>
</template>

<style>
  #edit-post {
    max-width: 750px;
  }
</style>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      postEdit: '',
      postId: null
    }
  },
  methods: {
    submitEdit(){
      const formData = new FormData();
      formData.append('userId', this.$store.state.userData.userId),
      formData.append('postId', this.postId)
      formData.append('text', this.postEdit)
      axios.put("http://localhost:3000/api/post/modify", formData, {
        headers: {
        Authorization: 'Bearer ' + this.$store.state.userData.token
      }})
      .then(response => {
        console.log(response)
        alert('Your post has been modified')
        localStorage.removeItem('postDataString')
        this.$router.push('/newsfeed')
      }).catch(error => console.error(error))
    },
    cancel(){
      localStorage.removeItem('postDataString')
      this.$router.push('/newsfeed')
    }
  },
  beforeMount() {
    let postDataString = localStorage.getItem('postDataString')
    let postData = JSON.parse(postDataString)
    this.postEdit = postData.text
    this.postId = postData.id
  },
  onUnmounted() {
    localStorage.removeItem('postDataString')
  },
}
</script>