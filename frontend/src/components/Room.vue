<template>
  <div>
     <Nav enlace="http://res.cloudinary.com/faus6rguez/image/upload/v1526487699/mainlogo_csze1j.png"/>
    <div>
    <main class='grid-wrapper' id='container'>
        <div id='demoContainer'>
            <div id='connectControls'>
                <!-- <button class='waves-effect waves-light btn' id='connectButton' onclick='connect()'>Conectarse a Sala</button> -->
                <!-- <button class='waves-effect waves-light btn' id='hangupButton' disabled='disabled' onclick='hangup()'>Salir de la Sala</button> -->
                <div id='videoSrcBlk'>
                </div>
                <br />
                <div id='otherClients'></div>
            </div>

            <section id='videos'>
                <div>
                    <div autoplay="autoplay" class="room-grid">
                      <div id="remoteVideos" class="room-grid__main room-wrapper" >
                        <video></video>
                        <video></video>
                        <video></video>
                      </div>
                    </div>
                </div>
                <div>
                    <div autoplay="autoplay" id="localVideos" class="room-wrapper">
                    </div>
                </div>
            </section>
        </div>
    </main>
    </div>
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
.room-grid {
  display:grid;
  grid-template-columns: 1fr minmax(0,80em) 1fr;
  grid-gap:10px;
}

.room-grid__main {
  grid-column: 2/3;
}
video {
  margin-top:10px;
  width: 350px;
  height:200px;
  background-color:blue;
}

.room-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap:wrap;
    flex-direction: row;
}

</style>
