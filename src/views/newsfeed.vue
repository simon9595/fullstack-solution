<template>
<p>This is the newsfeed.</p>
<p>You are logged in as username</p>

<newpost />
<div v-for="post in posts" v-bind:key="post.id">
<p>{{ post.User.username }}</p>
<p>{{ post.createdAt }}</p>
<p v-if="post.createdAt !== post.updatedAt">Edited:{{ post.updatedAt }}</p>
<p>{{ post.text }}</p>
<p>{{ post.likes }} likes {{ post.comments }} comments</p>
<button>Like</button>
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
    // post
  },
  beforeMount() {
    axios.get("http://localhost:3000/api/post")
    .then(response => {
      this.posts = response.data; 
    console.log(this.posts)})
    .catch(error => console.error(error))
  }
}
// import { mapGetters } from 'vuex';

// export default {
//     computed: {
//         ...mapGetters([
//             'username',
//         ])
//     },
// };
</script>