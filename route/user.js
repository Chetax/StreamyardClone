const express=require('express');
const {handeUserSingUp,handeUserLogin}=require('../controller/user');
const route=express.Router();
route.post('/',handeUserSingUp);
route.post('/login',handeUserLogin);
module.exports=route;
