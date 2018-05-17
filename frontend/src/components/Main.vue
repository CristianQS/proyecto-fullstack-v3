<template>
  <div>

    <main id="login">
        <div id="description">
            <h1>Make Awesome Your Presentations</h1>
        </div>
        <div id="builder">
            <div>
                <img src="http://res.cloudinary.com/faus6rguez/image/upload/v1526566936/logo_oin7px.png
" alt="SharedNet">
                <h2>Create Your Own Room</h2>
                <input placeholder="Room" @keyup.enter="goTo('room/' + roomName)" id="userInput" type="text" name="room" class="validate" v-model="roomName">
                <router-link :to="'/room/' + roomName" tag="span" style="cursor: pointer">
                <a class="waves-effect waves-light btn-large"><i class="material-icons right medium">add_to_queue</i>Crear Sala</a>
                </router-link>
                <router-link :to="'/room/' + roomName" tag="span" style="cursor: pointer">
                <a class="waves-effect waves-light btn-large"><i class="material-icons right medium">airplay</i>Unirse a Sala</a>
                </router-link>
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
  },
  methods: {
    goTo (url) {
      location.href = '#/' + url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    main {
        height: 100vh;
    }
    #description,
    #builder,
    #userInput {
        text-align: center;
    }
    #description {
        padding-top: 20vh;
        color: white;
    }
    #builder {
        background-color: white;
        padding: 0 5vw;
        padding-top: 20vh;
        border-left: 1px solid #ADADAD;
    }
    #userInput {
        padding-top: 5vh;
    }
    h1 {
        font-weight: 700;
    }
</style>
