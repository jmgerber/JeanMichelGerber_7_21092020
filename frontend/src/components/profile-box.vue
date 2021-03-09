<template>
  <aside v-if="user" class="profile-box">
    <img :src="user.avatar_url" alt="Photo de profil" />
    <h4>{{ user.lastname }} {{ user.firstname }}</h4>
    <div class="member-status">
      <span v-if="user.admin == true">Admin</span>
      <span v-else>Membre</span>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "profile-box",
  computed: {
    ...mapGetters({
      user: "showConnectedUser",
    }),
  },
  methods: {
    ...mapActions(["getOneUser"]),
  },
  created() {
    this.getOneUser();
  },
};
</script>

<style lang="scss">
.profile-box {
  box-sizing: border-box;
  width: 25%;
  height: 100%;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    max-width: 160px;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }
  .member-status {
    color: #fff;
    font-weight: 500;
    background-color: rgba(253, 81, 1, 0.9);
    padding: 5px 10px;
    border-radius: 0.5rem;
  }
}
</style>