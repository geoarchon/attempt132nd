const socket = io('/')
const videoGrid = document.getElementById('video_grid')
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
})
let myVideoStream;
const myVideo = document.createElement('video')
//muting self audio
myVideo.muted = true
const peers = {}

//taking user permission to access webcam and microphone and then adding them to the call
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })
  socket.on('user-connected', userId => {
    alert("A new user has joined!") //alerting other existing users when a new user joins
    connectToNewUser(userId, stream)
  })
  //sending messages typed inside the input field when the Enter key is pressed
  let text = $("input")
  $('html').keydown(function (e) {
    if (e.which == 13 && text.val().length !== 0) {
      socket.emit('message', text.val())
      text.val('')
    }
  });
  socket.on("createMessage", message => {
    $("ul").append(`<li class="message"><br/><br/><b>User says:</b><br/>${message}</li>`)
    scrollToBottom()
  })
})
//disconnecting users
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

//functions

//adding users to the existing video grid in the call
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })
  peers[userId] = call
}
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

const scrollToBottom = () => {
  var d = $('.chat_window');
  d.scrollTop(d.prop("scrollHeight"))
}

//control button functions
const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true
  }
}
const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true
  }
}
const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.mute_button').innerHTML = html
}
const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.mute_button').innerHTML = html
}
const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.video_button').innerHTML = html
}
function close_window() {
  if (confirm("Are you sure you want to leave this meeting?")) {
    window.open('/left.ejs','_self')
  }
}
const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.video_button').innerHTML = html
}
