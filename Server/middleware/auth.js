const { getUser } = require('../service/auth');

async function restricToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
console.log("Above if => ",userUid);
  if (!userUid)  return res.redirect("/login");
  const user = getUser(userUid);
  console.log("inside if => ",user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

module.exports = {
  restricToLoggedInUserOnly,

};
