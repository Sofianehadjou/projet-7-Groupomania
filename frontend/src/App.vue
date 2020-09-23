<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header.vue'

export default {
  name: 'App',
  data: function(){
    return {
      toggle1: true,
      toggle2: false,
    }
  },
  methods: {
         
  },
  components: {
    'header-top': header,
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
  margin-top: 60px;
}

</style>
