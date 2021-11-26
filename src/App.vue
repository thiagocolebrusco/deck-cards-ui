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
    font-size: 3em;
    margin-bottom: 10px;
  }
  .btn {
    border: 0;
    background-color: #0c965e;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 15px 20px;
    font-size: 1em;

    &.active {
      background-color: #0ebc76;
      border: 1px #0cda87 solid;
    }
  }

  .form-input {
    border: 0;
    padding: 15px 15px;
    font-size: 1em;
  }

  .form-input:focus-visible {
    outline: 0;
  }

  .label {
    color: white;
    font-weight: bold;
    margin: 15px 0;
    font-size: 1.2em;
  }
}
</style>
