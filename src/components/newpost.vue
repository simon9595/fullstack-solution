<template>
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
</template>

<style>
  textarea {
    height: 150px;
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