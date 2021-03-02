<template>
  <div id="app">
    <Nav />
    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Nav from "./components/nav";

export default {
  name: "app",
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
body {
  background: center / cover url("./assets/startup.jpg");
}
body,
p,
h1 {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Roboto", sans-serif;
}
.main-container {
  width: 60%;
  height: calc(100vh - 78px);
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.97);
  padding: 40px 40px 0;
}
</style>
