<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'

  export default {
    name: 'app',
    components: {
      Header
    },
    created(){
      
    }
  }
</script>

<style lang="scss">
	@import "assets/scss/main";
</style>