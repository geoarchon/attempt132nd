//express server created
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')
//peerjs used for p2p connections
app.use('/peerjs', peerServer)
//ejs template engine used to render the UI
app.set('view engine', 'ejs') 
app.use(express.static('public'))
app.get('/left.ejs', (req, res) => {
  res.render('left');
 });
 //dynamic room link generated with uuid
 //users can join different rooms with different links
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  //user joining the room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 
    //disconnecting from room
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT||3030)
