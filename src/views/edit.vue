<template>
<h1>Editing post</h1>
  <form>
    <textarea rows="7" cols="70" type="textarea" v-model="this.postEdit"></textarea><br>
    <button class="btn btn-secondary mx-2" @click="cancel()" type="button">Cancel</button>
    <button class="btn btn-primary" @click="submitEdit()" type="button">Publish</button>
  </form>
</template>

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
      axios.put("http://localhost:3000/api/post/modify", {
        userId: this.$store.state.userData.userId,
        postId: this.postId,
        text: this.postEdit
      }, {
        headers: {
        Authorization: 'Bearer ' + this.$store.state.userData.token
      }})
      .then(response => {
        console.log(response)
        alert('Your post has been modified')
        this.$router.push('/newsfeed')
      }).catch(error => console.error(error))
    },
    cancel(){
      console.log('Cancellation button? HURRY!')
      localStorage.removeItem('postDataString')
      this.$router.push('/newsfeed')
    }
  },
  beforeMount() {
    console.log('Oi')
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