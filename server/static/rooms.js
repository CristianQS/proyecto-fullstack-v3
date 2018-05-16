var selfEasyrtcid = ''
var haveSelfVideo = false
var otherEasyrtcid = null
var participantes = []
var num = 0
var admin = {}

function createLabelledButton(buttonLabel) {
  var button = document.createElement('button')
  button.setAttribute('class', 'waves-effect waves-light btn')
  button.appendChild(document.createTextNode(buttonLabel))
  document.getElementById('videoSrcBlk').appendChild(button)
  return button
}

function addMediaStreamToDiv(divId, stream, streamName, isLocal) {
  var container = document.createElement('div')
  container.style.marginBottom = '10px'
  // var formattedName = streamName.replace('(', '<br>').replace(')', '')
  var labelBlock = document.createElement('div')
  // labelBlock.style.width = '220px'
  // labelBlock.style.cssFloat = 'left'
  // labelBlock.innerHTML = '<pre>' + formattedName + '</pre><br>'
  // container.appendChild(labelBlock)
  var video = document.createElement('video')
  video.width = 340
  video.height = 180
  video.muted = isLocal
  video.style.verticalAlign = 'middle'
  container.appendChild(video)
  document.getElementById(divId).appendChild(container)
  video.autoplay = true
  easyrtc.setVideoObjectSrc(video, stream)
  return labelBlock
}

function addMediaStreamToDivLocal(divId, stream, streamName, isLocal) {
  var container = document.createElement('div')
  container.style.marginBottom = '10px'
  // var formattedName = streamName.replace('(', '<br>').replace(')', '')
  var labelBlock = document.createElement('div')
  // labelBlock.style.width = '220px'
  // labelBlock.style.cssFloat = 'left'
  // labelBlock.innerHTML = '<pre>' + formattedName + '</pre><br>'
  container.appendChild(labelBlock)
  var video = document.createElement('video')
  video.width = 350
  video.height = 200
  video.muted = isLocal
  video.style.verticalAlign = 'middle'
  container.appendChild(video)
  document.getElementById(divId).appendChild(container)
  video.autoplay = true
  easyrtc.setVideoObjectSrc(video, stream)
  return labelBlock
}

function createLocalVideo(stream, streamName) {
  var labelBlock = addMediaStreamToDivLocal('localVideos', stream, streamName, true)
  var closeButton = createLabelledButton('close')
  closeButton.onclick = function () {
    easyrtc.closeLocalStream(streamName)
    labelBlock.parentNode.parentNode.removeChild(labelBlock.parentNode)
  }
  labelBlock.appendChild(closeButton)
}


function initial() {

  //easyrtc.joinRoom(window.location.href,()=>{},()=>{},()=>{})
  easyrtc.connect('easyrtc.multistream', loginSuccess, loginFailure)

}



// function hangup() {
//   easyrtc.hangupAll()
//disable('hangupButton')
// }

function clearConnectList() {
  var otherClientDiv = document.getElementById('otherClients')
  while (otherClientDiv.hasChildNodes()) {
    otherClientDiv.removeChild(otherClientDiv.lastChild)
  }
}

function convertListToButtons(roomName, occupants, isPrimary) {
  if (roomName != "default") {
    var url = window.location.href
    var index = url.lastIndexOf("/")
    var newUrl = url.substring(index + 1)
    console.log("estos son los ocupantes " + occupants)

    clearConnectList()
    var otherClientDiv = document.getElementById('otherClients')
    for (var easyrtcid in occupants) {
      console.log("esto es easyrtcid " + easyrtcid)
      participantes.push(easyrtcid)
      // performCall(easyrtcid)
    }
    console.log("admin ", admin.easyrtcid)
    console.log("primary ", isPrimary.easyrtcid)
    // console.log("esto es is primary" , isPrimary)
    if(admin.easyrtcid == isPrimary.easyrtcid){
      var button = document.createElement('button')
      button.onclick = (function () {
          participantes.forEach(easyrtcid=>{
            performCall(easyrtcid)
          })})

      var label = document.createTextNode('Conectar con todos')
      button.appendChild(label)
      button.setAttribute('class', 'waves-effect waves-light btn ocultar')
      otherClientDiv.appendChild(button)
      }  
      //participantes = []
  }
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function performCall(targetEasyrtcId) {
  otherEasyrtcid = targetEasyrtcId
  var acceptedCB = function (accepted, easyrtcid) {
    console.log("esto es accept " + accepted)
    if (!accepted) {
      // easyrtc.showError('CALL-REJECTED', 'Sorry, your call to ' + easyrtc.idToName(easyrtcid) + ' was rejected')
      enable('otherClients')
    } else {
      console.log("hacen la llamada")
    }
  }

  var successCB = function () {
    //enable('hangupButton')
  }
  var failureCB = function () {
    //enable('otherClients')
  }
  var keys = easyrtc.getLocalMediaIds()

  easyrtc.call(otherEasyrtcid, successCB, failureCB, acceptedCB, keys)
  //enable('hangupButton')
}

function loginSuccess() {
  var url = window.location.href
  var index = url.lastIndexOf("/")
  var newUrl = url.substring(index + 1)
  easyrtc.joinRoom(newUrl, easyrtc.idToName(easyrtc.myEasyrtcid),
    function (success) {
      
      admin = Object.values(easyrtc.roomJoin.default.clientList)[0]
      easyrtc.setRoomOccupantListener(convertListToButtons)
      easyrtc.setAutoInitUserMedia(false)
      //
      // add an extra button for screen sharing
      //
      if(otherEasyrtcid){
        var screenShareButton = createLabelledButton('Desktop capture/share')
        screenShareButton.onclick = function () {
          var streamName = makeid()
          easyrtc.initDesktopStream(
            function (stream) {
              createLocalVideo(stream, streamName)
              console.log("otro stream " + otherEasyrtcid)
              if (otherEasyrtcid) {
                easyrtc.addStreamToCall(otherEasyrtcid, streamName)
              }
            },
            function (errCode, errText) {
              easyrtc.showError(errCode, errText)
            },
            streamName)
        }
      }else{
        var screenShareButton = createLabelledButton('Desktop capture/share')
        screenShareButton.onclick = function () {
          var streamName = makeid()
          easyrtc.initDesktopStream(
            function (stream) {
              createLocalVideo(stream, streamName)
              console.log("otro stream " + easyrtc.myEasyrtcid)
              if (easyrtc.myEasyrtcid) {
                easyrtc.addStreamToCall(easyrtc.myEasyrtcid, streamName)
              }
            },
            function (errCode, errText) {
              easyrtc.showError(errCode, errText)
            },
            streamName)
        }
      }
    },
    function (errorCode, errorText, roomName) {
      easyrtc.showError(errorCode, errorText + ": room name was(" + roomName + ")");
    });
}

function loginFailure(errorCode, message) {
  easyrtc.showError(errorCode, message)
}

function disconnect() {
  easyrtc.disconnect()
  //enable('connectButton')
  //    disable("disconnectButton");
  clearConnectList()
  easyrtc.setVideoObjectSrc(document.getElementById('selfVideo'), '')
}

easyrtc.setStreamAcceptor(function (easyrtcid, stream, streamName) {
  var labelBlock = addMediaStreamToDiv('remoteVideos', stream, streamName, false)
  labelBlock.parentNode.id = 'remoteBlock' + easyrtcid + streamName
})


easyrtc.setOnStreamClosed(function (easyrtcid, stream, streamName) {
  var item = document.getElementById('remoteBlock' + easyrtcid + streamName)
  item.parentNode.removeChild(item)
})

var callerPending = null

easyrtc.setCallCancelled(function (easyrtcid) {
  if (easyrtcid === callerPending) {
    document.getElementById('acceptCallBox').style.display = 'none'
    callerPending = false
  }
})

easyrtc.setAcceptChecker(function (easyrtcid, callback) {
  otherEasyrtcid = easyrtcid
  if (easyrtc.getConnectionCount() > 0) {
    easyrtc.hangupAll()
  }
  callback(true, easyrtc.getLocalMediaIds())
})

initial()
