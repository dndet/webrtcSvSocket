const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
    reconnection: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('unity-offer', (offer) => {
    console.log('Received Unity offer:', offer);
    socket.broadcast.emit('unity-offer', offer);
  });

  socket.on('unity-answer', (answer) => {
    console.log('Received Unity answer:', answer);
    socket.broadcast.emit('unity-answer', answer);
  });

  socket.on('unity-candidate', (candidate) => {
    console.log('Received Unity candidate:', candidate);
    socket.broadcast.emit('unity-candidate', candidate);
  });


  socket.on('video-offer', (offer) => {
    console.log('Received Video offer:', offer);
    socket.broadcast.emit('video-offer', offer);
  });

  socket.on('video-answer', (answer) => {
    console.log('Received Video answer:', answer);
    socket.broadcast.emit('video-answer', answer);
  });

  socket.on('video-candidate', (candidate) => {
    console.log('Received Video candidate:', candidate);
    socket.broadcast.emit('video-candidate', candidate);
  });
});

server.listen(3000, () => {
  console.log('Signaling server running on port 3000');
});
