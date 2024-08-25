const { getUser } = require('../service/auth');

async function restricToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    console.warn("No UID cookie found, redirecting to login.");
    return res.redirect("/login");
  }
  
  try {
    const user = getUser(userUid);
    if (!user) {
      console.warn("Invalid token, redirecting to login.");
      res.clearCookie('uid'); // Clear the potentially invalid cookie
      return res.redirect("/login");
    }
    
    req.user = user; // Attach the user object to the request for later use
    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    res.clearCookie('uid'); // Clear the cookie in case of an error
    res.redirect("/login");
  }
}

module.exports = {
  restricToLoggedInUserOnly,
};
