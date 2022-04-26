<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <router-link to="/">首页</router-link>-->
<!--    <router-link to="/select">内容页</router-link>-->
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App'
  // components: {
  //   HelloWorld
  // }
}
</script>

<style lang="scss">
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
