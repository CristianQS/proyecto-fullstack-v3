<template>
  <div class="hello">
    <nav>
      <div class="nav-wrapper grey darken-3">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="#">Sass</a>
          </li>
          <li>
            <a href="#">Components</a>
          </li>
          <li>
            <a href="#">JavaScript</a>
          </li>
        </ul>
      </div>
      </nav>
        <div class="row">
            <div class="grid col s12 bigimage wrapper ">
                <div class="grid__main ">
                    <h1 class="col s6 " >Make Screen Share</h1>
                    <div class="col s6 ">
                        <div class="card medium ">
                            <div class="card-content wrapper ">
                                <h2>
                                    Start to Share
                                </h2>
                                <input placeholder="Room" id="userInput" type="text" name="room" class="validate" v-model="roomName">
                                <router-link :to="'/Room/' + roomName" tag="span" style="cursor: pointer" class="mt-4">
                                <a class="waves-effect waves-light btn btn-large">Create Room</a>
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'CreateRoom',
  data () {
    return {
      roomName: ''
    }
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

.bigimage {
    background-image: url('./img/bg6.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 800px;
    width: 20%;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>
