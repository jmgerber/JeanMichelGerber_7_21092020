<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"
        ><img
          class="logo-groupomania"
          src="./assets\icon-left-font-monochrome-white.svg"
          alt="Logo de Groupomania"
          height="50"
      /></router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
body {
  background-image: url("./assets/startup.jpg");
}
body,
p {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Roboto", sans-serif;
}
#nav {
  background-color: rgba(0, 0, 0, 0.92);
  padding: 12px 0;
  text-align: center;
}
</style>
