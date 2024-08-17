const express = require('express');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create an HTTP server and wrap the express app
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

 const emailTosoketMap=new Map();
 const socketToemailMap=new Map();


io.on("connect", (socket) => {

  socket.on("join-room",(data)=>{
    const {roomId,emailId}=data;

    console.log("User ",emailId ," Joinded Room ", roomId)

      emailTosoketMap.set(emailId,socket.id);
      socketToemailMap.set(socket.id,emailId);
      socket.emit("joinedroom",roomId);
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("user-joined",emailId)
  })

  socket.on('call-user',(data)=>{
    const {emailId,offer} =data;
    const fromEmail=socketToemailMap.get(socket.id)
    const soketid=emailTosoketMap.get(emailId)
    io.to(soketid).emit('incoming-call',{from:fromEmail,offer:offer});
  })

  socket.on('call-accepted',(data)=>{
    const {from , ans}=data;
    const socketid=emailTosoketMap(from)
    socketid.emit("call-accepted",{ans})
    
  })

  console.log("User is connected with socket ID:", socket.id);
});

server.listen(8000, () => {
  console.log("Server is started on port 8000");
});