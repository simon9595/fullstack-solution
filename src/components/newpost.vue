<template>
  <div class="container">
    <form enctype="multipart/form-data" @submit.prevent="publish">
      <textarea v-model="text" rows="7" cols="70"></textarea> <br />
      <label for="file">Choose file to upload</label> <br />
      <input @change="uploadFile" ref="attachment" type="file" accept="image/*">
      <input type="submit" value="Pubish">
    </form>  
  </div>
</template>

<style>
  textarea {
    resize: none;
  }
</style>

<script>
import axios from "axios";
export default {
  name: "newPost",
  data(){
    return {
      text: '',
      attachment: null
    }
  },
  methods: {
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
      this.$router.go()
    }).catch(error => console.error(error));
  }},
  uploadFile() {
    console.log('File selected')
    this.attachment = this.$refs.attachment.files[0];
    console.log(this.attachment, this.$refs.attachment.files[0])
  }
  }
};

</script>