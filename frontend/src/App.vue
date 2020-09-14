<template>
  <contenu></contenu>
  <header-top></header-top>
</template>

<script>

import Contenu from './components/contenu.vue'
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
      'contenu': Contenu,
      'header-top': Header 
    }
  }

</script>

<style lang="scss">
#app {

}
</style>
