<template>
  <div>
      <nav>
        <img src="./pictures/logo.png" alt="NetShared-Logo">
    </nav>
    <main class="grid-wrapper" id="container">
        <div id="demoContainer">
            <div id="connectControls">
                <!-- <button class="waves-effect waves-light btn" id="connectButton" onclick="connect()">Conectarse a Sala</button> -->
                <!-- <button class="waves-effect waves-light btn" id="hangupButton" disabled="disabled" onclick="hangup()">Salir de la Sala</button> -->
                <!-- <h2>Fuentes de Video</h2> -->
                <div id="videoSrcBlk">
                </div>
                <br />
                <!-- <strong>Usuarios Conectados</strong> -->
                <div id="otherClients"></div>
            </div>

            <section id="videos">
                <div>
                    <h2>Streams Remoto</h2>
                    <div autoplay="autoplay" id="remoteVideos"></div>
                </div>
                <div>
                    <h2>Streaming Local</h2>
                    <div autoplay="autoplay" id="localVideos">
                    </div>
                </div>
            </section>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  created () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute(
      'src',
      './rooms.js'
    )
    document.head.appendChild(recaptchaScript)
  }
}
</script>

<style scoped>
:root {
  --four-cols: repeat(4, calc(90%/4));
}

/* ETIQUETAS */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
}

body {
  background-image: url("./pictures/wallpaper2.jpg");
  background-size: cover;
}

nav {
  height: 100px;
  margin-bottom: 50px;
  background-color: white;
}

h2 {
  font-size: 2.5rem;
}

video {
  border-radius: 50%;
  background-color: white;
}

/* GRID */

.grid-wrapper,
#videos,
#remoteVideos {
  display: grid;
}

.grid-wrapper {
  grid-template-columns: minmax(1em, 1fr) minmax(0, 80em) minmax(1em, 1fr);
}

.grid-wrapper > div {
  grid-column: 2;
}

#videos {
  grid-template-columns: 65% 35%;
}

#remoteVideos {
  grid-template-columns: var(--four-cols);
}

#localVideos > div,
#remoteVideos > div {
  overflow: hidden;
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
</style>
