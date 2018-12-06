<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './style/normalize.scss';
  @import './style/reset.scss';
  #app {
    font-family: Consolas, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 24px;
    height: 100%;
  }
</style>
