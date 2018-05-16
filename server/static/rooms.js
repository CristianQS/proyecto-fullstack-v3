var selfEasyrtcid = ''
var haveSelfVideo = false
var otherEasyrtcid = null
var participantes = []
var nameRooms = []

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
  var formattedName = streamName.replace('(', '<br>').replace(')', '')
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
  // container.style.marginBottom = '10px'
  var formattedName = streamName.replace('(', '<br>').replace(')', '')
  var labelBlock = document.createElement('div')
  labelBlock.style.width = '220px'
  labelBlock.style.cssFloat = 'left'
  labelBlock.innerHTML = '<pre>' + formattedName + '</pre><br>'
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
  easyrtc.currentRute = window.location.href
  participantes.push(easyrtc)

  
  easyrtc.connect('easyrtc.multistream', loginSuccess, loginFailure)
  easyrtc.setRoomOccupantListener(convertListToButtons)


  console.log(easyrtc)
  console.log("rooms joined" + easyrtc.getRoomsJoined())
  easyrtc.setAutoInitUserMedia(false)
  $('.ocultar').click();
  //
  // add an extra button for screen sharing
  //
  var screenShareButton = createLabelledButton('Desktop capture/share')
  var numScreens = 0

  screenShareButton.onclick = function () {
    numScreens++
    var streamName = 'screen' + numScreens
    easyrtc.initDesktopStream(
      function (stream) {
        createLocalVideo(stream, streamName)
        if (otherEasyrtcid) {
          easyrtc.addStreamToCall(otherEasyrtcid, streamName)
        }
      },
      function (errCode, errText) {
        easyrtc.showError(errCode, errText)
      },
      streamName)
  }
}

function hangup() {
  easyrtc.hangupAll()
  //disable('hangupButton')
}

function clearConnectList() {
  var otherClientDiv = document.getElementById('otherClients')
  while (otherClientDiv.hasChildNodes()) {
    otherClientDiv.removeChild(otherClientDiv.lastChild)
  }
}

function convertListToButtons(roomName, occupants, isPrimary) {
  if(roomName!= "default"){
  var url = window.location.href
  var index = url.lastIndexOf("/")
  var newUrl = url.substring(index + 1)


  clearConnectList()
  var otherClientDiv = document.getElementById('otherClients')
  for (var easyrtcid in occupants) {

      var button = document.createElement('button')
      button.onclick = (function (easyrtcid) {
        return function () {
          performCall(easyrtcid)
        };
      }(easyrtcid))

      var label = document.createTextNode('Conectar con ' + easyrtc.idToName(easyrtcid))
      button.appendChild(label)
      button.setAttribute('class', 'waves-effect waves-light btn ocultar')
      otherClientDiv.appendChild(button)
    }
  }
}

function performCall(targetEasyrtcId) {
  var acceptedCB = function (accepted, easyrtcid) {
    if (!accepted) {
      easyrtc.showError('CALL-REJECTED', 'Sorry, your call to ' + easyrtc.idToName(easyrtcid) + ' was rejected')
      enable('otherClients')
    } else {
      otherEasyrtcid = targetEasyrtcId
    }
  }

  var successCB = function () {
    //enable('hangupButton')
  }
  var failureCB = function () {
    enable('otherClients')
  }
  var keys = easyrtc.getLocalMediaIds()

  easyrtc.call(targetEasyrtcId, successCB, failureCB, acceptedCB, keys)
  //enable('hangupButton')
}

function loginSuccess() {
  var url = window.location.href
  var index = url.lastIndexOf("/")
  var newUrl = url.substring(index + 1)
  console.log(newUrl)
  easyrtc.joinRoom(newUrl, "",
    function (success) {
      console.log("esto es success " + success)

      /* we'll geta room entry event for the room we were actually added to */
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
