<template>
  <section id="signup-container">
    <form class="signup-form" method="post" @submit.prevent="saveUser">
      <p>
        <label for="lastName">Nom : </label>
        <input type="text" name="lastName" v-model="form.lastName" />
      </p>
      <p>
        <label for="firstName">Prénom : </label>
        <input type="text" name="firstName" v-model="form.firstName" />
      </p>
      <p>
        <label for="email">Mail : </label>
        <input type="text" name="email" v-model="form.email" />
      </p>
      <p>
        <label for="password">Mot de passe : </label>
        <input type="password" name="password" v-model="form.password" />
      </p>
      <button type="submit">S'inscrire</button>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signup",
  computed: {
    form: {
      get() {
        return this.$store.state.signupForm;
      },
      set(values) {
        this.$store.commit("updateSignupForm", values);
      },
    },
  },
  methods: {
    ...mapActions(["saveUser"]),
  },
};
</script>

<style>
</style>