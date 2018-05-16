<template>
  <div>
    <Nav enlace="http://res.cloudinary.com/faus6rguez/image/upload/v1526487699/logo_ympqbb.png"/>
    <main class="row">
        <div class="grid col s12 bigimage wrapper ">
            <div class="grid__main ">
                <h1 class="col s6 " >Nacho es un Tolete</h1>
                <div class="col s6 ">
                    <div class="card medium ">
                        <div class="card-content wrapper ">
                            <h2>
                                Crea Tu Propia Sala
                            </h2>
                            <input placeholder="Room" id="userInput" type="text" name="room" class="validate" v-model="roomName">
                            <router-link :to="'/Room/' + roomName" tag="span" style="cursor: pointer" class="mt-4">
                            <a class="waves-effect waves-light btn-large"><i class="material-icons right medium">airplay</i>Crear Sala</a>
                            </router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
  </div>
</template>

<script>
import Nav from './nav'
export default {
  name: 'Main',
  data () {
    return {
      roomName: ''
    }
  },
  components: {
    Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-size: 70px;
    color: white;
}

p{
    font-size: 20px;
}
.grid {
    display: grid;
    grid-template-columns:1fr minmax(0,80em)1fr ;
}

.grid__main {
    grid-column: 2/3;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

nav.wrapper-grid a {
    text-align: left;
}
main {
    margin-top: 20vh;
}
</style>
