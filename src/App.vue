<template>
  <div id="app">
    <h1>Deck of cards</h1>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background-color: #15775a;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1200px;
  margin: 0 auto;

  & > h1 {
    color: #efef5f;
  }
}
</style>
