const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

function setUser(user) {
    return jwt.sign(
        { _id: user._id, email: user.email },
        secret,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
}

module.exports = { setUser, getUser };
