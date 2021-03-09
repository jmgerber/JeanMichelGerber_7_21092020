<template>
  <nav>
    <router-link to="/">
      <img
        class="logo-groupomania"
        src="../assets\icon-left-font-monochrome-white.svg"
        alt="Logo de Groupomania"
        height="50"
    /></router-link>
    <div v-if="this.$store.state.userId != null">
      <router-link class="profile-link" to="/profile"> Mon compte </router-link>
      <router-link to="/" @click.native="$store.dispatch('disconnectUser')"
        >Déconnexion</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss">
nav {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.92);
  padding: 12px 0;
  justify-content: space-around;
  .profile-link {
    margin-right: 20px;
  }
  a {
    outline: none;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    font-size: 1.1rem;
  }
}
</style>