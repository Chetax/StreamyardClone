const User = require('../model/user');
const {v4:uuidv4}=require('uuid');
const { setUser }=require('../service/auth');
async function handeUserSingUp(req, res) {
  const { name, email, password } = req.body;
  const user1 = await User.findOne({ email });
    await User.create({ name, email, password });
    return res.redirect('/login');
}

async function handeUserLogin(req, res) {
  const {  email, password } = req.body;
  const user = await User.findOne({ email, password});
console.log("user => ",user);
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

 
   const token= setUser(user);
    res.cookie("uid",token);
    return res.redirect('/stream');

}

module.exports = { handeUserSingUp,handeUserLogin };
