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
                <div id="videoSrcBlk">
                </div>
                <br />
                <div id="otherClients"></div>
            </div>

            <section id="videos">
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

<style>
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


.wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap:wrap;
    flex-direction: row;
}

</style>
