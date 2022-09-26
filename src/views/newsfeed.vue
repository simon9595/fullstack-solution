<template>
<router-link to="/control">User control panel</router-link>
<p>This is the newsfeed.</p>
<p>You are logged in as {{ $store.state.userData.username }}</p>

<newpost />
<div v-for="post in posts" v-bind:key="post.id">
<p>{{ post.User.username }}</p>
<p>{{ post.createdAt }}</p>
<p v-if="post.createdAt !== post.updatedAt">Edited:{{ post.updatedAt }}</p>
<p>{{ post.text }}</p>
<img v-if="post.attachment" v-bind:src="post.attachment">
<p>{{ post.likes }} likes <!--{{ post.comments }}--> 0 comments</p> <!-- fix the comments so it displays the length -->
<button @click="postLike(postId = post.id)">Like</button>
<button>Comment</button>
</div>
</template>

<style>

</style>

<script>
import axios from "axios"
import newpost from "../components/newpost.vue"
// import post from "../components/post.vue"
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
    postLike(postId){
      console.log(postId)
      axios.post("http://localhost:3000/api/post/" + postId + "/like", {
        id: postId,
        userId: this.$store.state.userData.userId
      })
      .then(response => {
        console.log(response)
      }).catch(error => console.error(error));
    }
  },
  beforeMount() {
    axios.get("http://localhost:3000/api/post")
    .then(response => {
      this.posts = response.data; 
    console.log(this.posts)})
    .catch(error => console.error(error))
  },
}
</script>