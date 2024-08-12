const express=require('express')
const {Server, Socket}=require('socket.io')
const bodyParser=require('body-parser')

const app=express();
const io=new Server()


app.use(bodyParser.json())

io.on("connection",socket=>{

})

io.listen(8001);
app.listen(8000,()=>{
    console.log("Server Is Started On Port 4000"); 
})