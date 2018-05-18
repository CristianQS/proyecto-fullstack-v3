<template>
    <nav class="wrapper-grid">
        <router-link :to="'/'" tag="span" style="cursor: pointer">
    <a :style="{'text-align': alineacion}">
        <img :src="enlace" alt="SharedNet">
    </a>
        </router-link>
</nav>
</template>

<script>
export default {
  name: 'Nav',
  props: [
    'enlace',
    'alineacion'
  ]
}
</script>

<style scoped>
    nav {
    background-color: #fff;
    margin-bottom: 20px;
    text-align: center;
    overflow: hidden;
    height: 8vh;
    box-shadow: none;
}

nav img {
    padding-top: 5px;
    height: 3.7rem;
}
</style>
