<template>
  <div class="container mt-1" id="edit-post">
  <h1>Editing post</h1>
    <form enctype="multipart/form-data" @submit.prevent="submitEdit()">
      <textarea class="form-control" type="textarea" v-model="this.postEdit"></textarea><br>
      <div class="d-sm-flex justify-content-between row">
        <label for="file">Choose file to upload</label>
        <input class="btn btn-secondary form-control" @change="changeFile" ref="editAttachment" type="file" accept="image/*">
      </div>
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
      editAttachment: null,
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
      if(this.editAttachment !== null) {
        formData.append('attachment', this.editAttachment)
      }
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
    },
    changeFile(){
      console.log('Attachment selected')
      this.editAttachment = this.$refs.editAttachment.files[0];
      console.log(this.editAttachment, this.$refs.editAttachment.files[0])
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