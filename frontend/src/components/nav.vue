<template>

    <nav class="wrapper-grid">
    <a href="index.html">
        <img :src="enlace" alt="SharedNet">
    </a>
</nav>
</template>

<script>
export default {
  name: 'Nav',
  props: [
    'enlace'
  ]
}
</script>

<style scoped>
    nav {
    background-color: white;
    border-bottom: 1px solid grey;
    color: black;
    margin-bottom: 20px;
    text-align: center;
    overflow: hidden;
    height: 90px;
}

nav img {
    height: 5rem;
}
</style>
