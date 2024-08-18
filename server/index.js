const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const emailTosoketMap = new Map();
const socketToemailMap = new Map();

io.on("connect", (socket) => {
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User ", emailId, " Joinded Room ", roomId);
    emailTosoketMap.set(emailId, socket.id);
    socketToemailMap.set(socket.id, emailId);
    socket.emit("joinedroom", { roomId, emailId });
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
  
  socket.on('call-user',(data)=>{
      const { emailId, offer}=data;
      console.log("call-user Function get called",{emailId,offer});
      const socketid=emailTosoketMap.get(emailId)
      const from=socketToemailMap.get(socket.id)
      socket.to(socketid).emit("incomming-call",{from,offer})
  })

  socket.on('call-accepted',(data)=>{
    console.log("Call-accepted function get called from client and printing in server");
    const {from,answer}=data;
    const socketid=emailTosoketMap.get(from)
    socket.to(socketid).emit("call-accepted",{answer})
    
  })

  console.log("User is connected with socket ID:", socket.id);
});

server.listen(8000, () => {
  console.log("Server is started on port 8000");
});
