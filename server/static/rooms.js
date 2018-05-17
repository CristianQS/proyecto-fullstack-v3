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
  video.id = streamName;
  video.onclick = function () {
    requestFullScreen(streamName);
  }
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
  video.width = 800
  video.height = 600
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

    clearConnectList()
    var otherClientDiv = document.getElementById('otherClients')
    for (var easyrtcid in occupants) {
      participantes.push(easyrtcid)
    }
    if (admin.easyrtcid == isPrimary.easyrtcid) {
      var button = document.createElement('button')
      button.onclick = (function () {
        participantes.forEach(easyrtcid => {
          performCall(easyrtcid)
        })
        participantes = []
      })

      var label = document.createTextNode('Conectar con todos')
      button.appendChild(label)
      button.setAttribute('class', 'waves-effect waves-light btn ocultar')
      otherClientDiv.appendChild(button)
    }
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
    if (!accepted) {
      // easyrtc.showError('CALL-REJECTED', 'Sorry, your call to ' + easyrtc.idToName(easyrtcid) + ' was rejected')
      enable('otherClients')
    } else {
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
      if (admin.easyrtcid != easyrtc.myEasyrtcid) {
        if (otherEasyrtcid) {
          var screenShareButton = createLabelledButton('Desktop capture/share')
          screenShareButton.onclick = function () {
            var streamName = makeid()
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
        } else {
          var screenShareButton = createLabelledButton('Desktop capture/share')
          screenShareButton.onclick = function () {
            var streamName = makeid()
            easyrtc.initDesktopStream(
              function (stream) {
                createLocalVideo(stream, streamName)
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
  // labelBlock.parentNode.id = streamName
  //labelBlock.parentNode.className = 'grid__main wrapper'
})


easyrtc.setOnStreamClosed(function (easyrtcid, stream, streamName) {
  var item = document.getElementById(streamName)
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

function requestFullScreen(streamName) {
  var elem = document.getElementById(streamName);

  elem.className = "bigBox";
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  var hideBox = document.getElementById("shrinkBox");
  hideBox.className = "yesShrink";
  hideBox.onclick = function () {
    hideBox.className = "noShrink";
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    elem.className = "smallBox";
  };

}

initial()
