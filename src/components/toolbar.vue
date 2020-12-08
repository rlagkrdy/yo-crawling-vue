<template>
  <div class="toolbar-box">
    <img class="toolbar-logo" src="../assets/images/icon-fenker-logo-simbol.png" alt="fenker-logo">
    <img class="toolbar-text-image" src="../assets/images/icon-fenker-logo-text.png" alt="fenker-logo">
  </div>
</template>


<script>
  export default {
    name: 'Toolbar',
    props: {}
  };
</script>

<style scoped>
  .toolbar-box {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid red;
  }

  .toolbar-logo {
    height: 40px;
  }

  .toolbar-text-image {
    margin-left: 10px;
    height: 20px;
  }
</style>
