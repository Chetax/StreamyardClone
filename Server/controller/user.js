const User = require('../model/user');
const {v4:uuidv4}=require('uuid');
const { setUser }=require('../service/auth');

async function handeUserSingUp(req, res) {
  const { name, email, password } = req.body;

  // Check if user with given email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send("User with this email already exists.");
  }

  // Ensure password is a string
  const passwordString = Array.isArray(password) ? password.join('') : password;

  // Create new user
  try {
    await User.create({ name, email, password: passwordString });
    return res.redirect('/login');
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("An error occurred while creating the user.");
  }
}


async function handeUserLogin(req, res) {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // If no user found or password doesn't match, return error
  if (!user || user.password !== password) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // If user found and password matches, generate token and set cookie
  const token = setUser(user);
  res.cookie("uid", token);

  // Redirect to stream page
  return res.redirect('/stream');
}


module.exports = { handeUserSingUp,handeUserLogin };
