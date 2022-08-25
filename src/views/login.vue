<template>
  <div class="login">
    <img id="logo-top" src="../assets/icon-above-font.png" alt="groupomania logo">
    <h1>Login</h1>
    <form>
      <label for="email">E-mail:</label><br>
      <input type="text" id="email" name="e-mail"><br>
      <label for="password">Password</label><br>
      <input type="password" id="password" name="password"><br>
      <input value="Log in" type="submit">
    </form>
    <p>Don't have an account? <router-link to='/signup'>Sign up</router-link></p>
  </div>
</template>

<style>
#logo-top {
  width: 400px;
  height: 400px;
}
</style>