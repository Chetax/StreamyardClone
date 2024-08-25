const express=require('express');
require('dotenv').config();
const path=require('path');
const cookieParser=require('cookie-parser');
const app=express();
const {restricToLoggedInUserOnly}=require('./middleware/auth');
const Userroute=require('./route/user');
const staticRoute=require('./route/staticRoute');

const {connectotmongodb}=require('./connect');
connectotmongodb('mongodb://localhost/User').then(()=>{console.log("Mongose Connect");})
app.set("view engine","ejs");
app.set('views',path.resolve('./view'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/Public',express.static('Public'));
app.use('/',staticRoute);     
app.use('/user',Userroute);


app.listen(3001,()=>{
    console.log("Server Started!!!!")
});
