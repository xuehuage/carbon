<template>
  <div id="app">
    <PhonePage></PhonePage>
  </div>
</template>

<script>
import PhonePage from './components/PhonePage.vue'

export default {
  name: 'App',
  components: {
    PhonePage
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
