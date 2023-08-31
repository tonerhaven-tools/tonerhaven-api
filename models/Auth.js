const jwt = require('jsonwebtoken')
const Config   = require('../configs/application');

const Auth = (req, res, next) => {
    const tokenCookie = req.headers.cookie?.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('token='));
    if (!tokenCookie) {
        console.log("Unauthorized");
        return res.sendStatus(401);
    }
    const token = tokenCookie.split('=')[1];
    jwt.verify(token, Config.SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Forbidden");
            return res.sendStatus(403);
        }
        console.log("Access granted");
        req.user = user;
        next();
    });
};

module.exports = Auth