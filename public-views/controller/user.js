const User = require('../model/user');
const { setUser }=require('../service/auth');
const bcrypt = require('bcrypt');

async function handeUserSingUp(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User with this email already exists.");
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).send("An error occurred while creating the user.");
    }

    bcrypt.hash(password, salt, async function(err, hash) {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("An error occurred while creating the user.");
      }

      try {
        await User.create({ name, email, password: hash });
        return res.redirect('/login');
      } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).send("An error occurred while creating the user.");
      }
    });
  });

}



async function handeUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  bcrypt.compare(password, user.password, function(err, result) {
    if (err || !result) {
      return res.render("login", {
        error: "Invalid Username or Password",
      });
    }

    const token = setUser(user);
    res.cookie("uid", token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.redirect('http://localhost:3000');
  });
}


module.exports = { handeUserSingUp,handeUserLogin };
