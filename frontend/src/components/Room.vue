<template>
  <div>
      <Nav enlace='http://res.cloudinary.com/faus6rguez/image/upload/v1526487699/mainlogo_csze1j.png' alineacion='center'/>
    <main class='grid-wrapper' id='container'>
        <div id='demoContainer'>
            <div id='connectControls'>
                <div id='otherClients' class="customer-button"></div>
                <div id='videoSrcBlk'></div>
            </div>
            <section >
                <div>
                    <div autoplay='autoplay' class='grid'>
                      <div id='remoteVideos' class='grid__main wrapper' >
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

.customer-button {
  display: flex;
  justify-content: center;
}

.grid {
  display:grid;
  grid-template-columns: 1fr minmax(0,80em) 1fr;
}

.grid__main {
  grid-column: 2/3;
}
video {
  margin-top:10px;
  background-color: #5F7683;
}
video:hover {
  cursor: pointer;
}
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
}
:root {
  --four-cols: repeat(4, calc(90% / 4));
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
  grid-gap:10px;
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
#videoSrcBlk {
  display: flex;
  align-items: center;
  height: 15vh;
}
#videoSrcBlk button {
  margin: 0 auto;
}
#localVideos>div>div {
  text-align: center;
}
div#remoteVideos:hover >div:after {
    content: "🖳 Click to fullscreen mode";
    color: #FFF;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .8;
    cursor: pointer;
    pointer-events: none;
}
</style>
