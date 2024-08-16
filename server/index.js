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

io.on("connect", (socket) => {

  socket.on("join-room",(data)=>{
    const {roomId,emailId}=data;
    console.log("User ",emailId ," Joinded Room ", roomId)
      emailTosoketMap.set({emailId,roomId});
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("user-joined",{emailId})
      socket.emit("joinedroom",roomId);
  })
  console.log("User is connected with socket ID:", socket.id);
});

server.listen(8000, () => {
  console.log("Server is started on port 8000");
});
