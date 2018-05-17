<template>
  <div>
     <Nav enlace="http://res.cloudinary.com/faus6rguez/image/upload/v1526487699/mainlogo_csze1j.png"/>
    <main class='grid-wrapper' id='container'>
        <div id='demoContainer'>
            <div id='connectControls'>
                <!-- <button class='waves-effect waves-light btn' id='connectButton' onclick='connect()'>Conectarse a Sala</button> -->
                <!-- <button class='waves-effect waves-light btn' id='hangupButton' disabled='disabled' onclick='hangup()'>Salir de la Sala</button> -->
                <div id='videoSrcBlk' class="customer-button">
                </div>
                <br />
                <div id='otherClients' class="customer-button"></div>
            </div>

            <section >
                <div>
                    <div autoplay="autoplay" class="grid">
                      <div id="remoteVideos" class="grid__main wrapper" >
                      </div>
                    </div>
                </div>
                <div>
                    <div autoplay="autoplay" id="localVideos" class="wrapper">
                    </div>
                </div>
            </section>
        </div>
    </main>
  </div>
</template>

<script>
import Nav from './nav'
export default {
  created () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', './rooms.js')
    document.head.appendChild(recaptchaScript)
  },

  components: {
    Nav
  }
}
</script>

<style>

.customer-button{
  display: flex;
  justify-content: center;
}

.grid {
  display:grid;
  grid-template-columns: 1fr minmax(0,80em) 1fr;
  grid-gap:10px;
}

.grid__main {
  grid-column: 2/3;
}
video {
  margin-top:10px;
}

video:hover {
  cursor: pointer;
}

.wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap:wrap;
    flex-direction: row;
}

:root {
  --four-cols: repeat(4, calc(90%/4));
}
/* ETIQUETAS */
nav {
  height: 100px;
  margin-bottom: 50px;
  background-color: white;
  text-align: center;
}
h2 {
  font-size: 2.5rem;
}
video {
  background-color: white;
}
/* .ocultar {
  display: none;
} */
/* GRID */
.grid-wrapper,
#remoteVideos {
  display: grid;
}
.grid-wrapper {
  grid-template-columns: minmax(1em, 1fr) minmax(0, 80em) minmax(1em, 1fr);
}
.grid-wrapper > div {
  grid-column: 2;
}
#remoteVideos {
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}
#remoteVideos > div {
  overflow: hidden;
  text-align: center;
}
/* STYLE */
#demoContainer {
  background-color: rgba(139, 143, 148, 0.7);
  min-height: 80vh;
  padding: 20px;
  border-radius: 5px;
}
#localVideos video {
  border-radius: 0;
}
    nav.wrapper-grid a {
        text-align: center;
    }
    nav.wrapper-grid img {
      height: 4.9rem;
    }

</style>
