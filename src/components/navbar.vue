<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <img class="navbar-brand" id="logo" src="../assets/icon-left-font.png">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-sm-end" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/newsfeed">Newsfeed</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/control">User control panel</router-link>
        </li>
        <li class="nav-item">
          <button @click="logout()" class="btn btn-danger">Log out</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<style>
#logo {
  max-height: 4em;
  max-width: 13em;
}
</style>

<script>
export default {
  methods: {
    logout(){
      console.log('Logging out')
      localStorage.clear();
      this.$store.commit('loginData', [undefined])
      this.$router.push('/')
    },
  },
}
</script>