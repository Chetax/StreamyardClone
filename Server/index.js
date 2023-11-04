const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const app=express();
const {restricToLoggedInUserOnly}=require('./middleware/auth');
const server = require('http').Server(app)
const io = require('socket.io')(server)


const Userroute=require('./route/user');
const staticRoute=require('./route/staticRoute');
const strem=require('./route/strem');

const {connectotmongodb}=require('./connect');
connectotmongodb(process.env.MONGO_URL).then(()=>{console.log("Mongose Connect");})
 



app.set("view engine","ejs");
app.set('views',path.resolve('./view'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/Public',express.static('./Public'));
app.use('/',staticRoute);     
app.use('/user',Userroute);
app.use('/stream',restricToLoggedInUserOnly,strem)

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
  })
  
  io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).emit('user-connected', userId)
      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
    })
  })


server.listen(8000,()=>{
    console.log("Server Started!!!!")
});
