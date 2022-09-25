<template>
  <form @submit.prevent="publish">
    <textarea v-model="text" rows="7" cols="70"></textarea> <br />
    <label for="file">Choose file to upload</label> <br />
    <input @change="onFileChange" type="file" accept="image/*">
    <input type="submit" value="Pubish">
  </form>  
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
      userId: null,
      text: null,
      attachment: null
    }
  },
  methods: {
    async publish() {
      console.log(this.userId, this.text, this.file)
      await axios.post('http://localhost:3000/api/post/publish',{
      userId: this.$store.state.userData.userId,
      text: this.text,
      attachment: null
    }).then(response => {
      console.log(response)
      alert('Your post has been published')
      this.$router.go()
    }).catch(error => console.error(error));
  },
  }
};

</script>