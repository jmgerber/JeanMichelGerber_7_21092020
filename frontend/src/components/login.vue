<template>
  <section id="login-container">
    <p>Bienvenue sur le réseau social interne de Groupomania !</p>
    <div id="login-form">
      <h2>Connexion</h2>
      <form method="post" @submit.prevent="getOneUser">
        <p class="input-container">
          <label for="email">Email</label><br />
          <input type="text" name="email" v-model="loginForm.email" />
        </p>
        <p class="input-container">
          <label for="password">Mot de passe</label><br />
          <input type="password" name="password" v-model="loginForm.password" />
        </p>
        <button type="submit">Se connecter</button>
        <p class="no-account">Pas de compte ?</p>
        <p>
          <router-link class="signup-link" to="/signup">
            Inscription
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  computed: {
    loginForm: {
      get() {
        return this.$store.state.loginForm;
      },
      set(values) {
        this.$store.commit("updateLoginForm", values);
      },
    },
  },
  methods: {
    ...mapActions(["getOneUser"]),
  },
};
</script>

<style lang="scss">
#login-container {
  width: 60%;
  height: calc(100vh - 78px);
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.97);
  & > p {
    text-align: center;
    font-size: 1.5rem;
    padding-top: 15px;
  }
}

#login-form {
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.18);
  width: 60%;
  margin: 20px auto 0;
  h2 {
    text-align: center;
    color: #fff;
    border-radius: 1rem 1rem 0 0;
    background-color: rgba(253, 81, 1, 0.8);
    padding: 10px 0;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .input-container {
      margin-bottom: 12px;
      width: 66%;
      max-width: 250px;
      label {
        font-weight: 500;
      }
      input {
        font-family: "Roboto", sans-serif;
        box-sizing: border-box;
        margin-top: 3px;
        width: 100%;
        height: 32px;
        font-size: 1rem;
        border-radius: 1rem;
        padding-left: 12px;
        font-weight: 400;
        border: none;
        outline: none;
      }
    }
    button {
      color: #fff;
      background-color: rgba(253, 81, 1, 0.8);
      padding: 10px 24px;
      font-size: 1.1rem;
      border-radius: 1rem;
      border: none;
      margin: 10px 0 40px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 700;
    }
    .no-account {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }
    .signup-link {
      letter-spacing: 0.05rem;
      text-transform: uppercase;
      font-weight: 500;
      display: inline-block;
      text-decoration: none;
      color: #000;
      background-color: #fff;
      padding: 10px 30px;
      font-size: 1.1rem;
      margin-bottom: 20px;
      border: none;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.75);
    }
  }
}
</style>