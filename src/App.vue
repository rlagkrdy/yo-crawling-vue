<template>
  <div id="app">
    <Toolbar/>
    <Contents/>
  </div>
</template>

<script>
  require('@/assets/css/reset.css');
  import Toolbar from './components/toolbar.vue';
  import Contents from '@/components/contents';

  export default {
    name: 'App',
    components: {
      Contents,
      Toolbar
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
