const { getUser } = require('../service/auth');

async function restricToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("Above if => ", userUid);
  if (!userUid) return res.redirect("/login");

  try {
    const user = await getUser(userUid); // Await for the asynchronous operation to complete
    console.log("inside if => ", user);
    
    if (!user) return res.redirect("/login");
    req.user = user;
    next();
  } catch (error) {
    // Handle error appropriately, maybe log it
    console.error("Error fetching user:", error);
    res.redirect("/login");
  }
}

module.exports = {
  restricToLoggedInUserOnly,
};
