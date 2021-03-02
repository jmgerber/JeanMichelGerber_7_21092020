<template>
  <section id="login-container">
    <h1>Bienvenue sur le réseau social interne de Groupomania !</h1>
    <div id="login-form">
      <h2>Connexion</h2>
      <form method="post" @submit.prevent="loginUser">
        <p class="input-container">
          <label for="email">Email</label><br />
          <input type="text" name="email" v-model="email" />
        </p>
        <p class="input-container">
          <label for="password">Mot de passe</label><br />
          <input type="password" name="password" v-model="password" />
        </p>
        <p class="error-login" v-if="this.$store.state.errorMsg != null">
          {{ this.$store.state.errorMsg }}
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
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      axios
        .post("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.userId);
          this.$store.dispatch("getUser", res.data.userId);
          this.email = this.password = null;
        })
        .catch((error) => {
          this.password = null;
          this.$store.state.errorMsg =
            "Le mot de passe ou l'email est incorrect";
          console.log(error);
        });
    },
  },
  mounted() {
    this.email = null;
    this.$store.state.errorMsg = null;
  },
};
</script>

<style lang="scss">
#login-container > h1 {
  text-align: center;
  font-size: 1.6rem;
  padding-top: 15px;
  font-weight: 400;
}

#login-form {
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.18);
  width: 60%;
  margin: 20px auto 0;
  h2 {
    margin: 0;
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
    padding: 20px 0 30px;
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
    .error-login {
      color: rgb(206, 21, 21);
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
      border: none;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.75);
    }
  }
}
</style>