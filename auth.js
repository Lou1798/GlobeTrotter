// Charging the models
const db = require('./models/index');
const User = db.User;
const jwt = require('jsonwebtoken')
const jwtKey = "my_secret_key"

//fonction pour se logger 
exports.loginUser = async function (req, res) {
    // find user in db with username and password
    await User.findOne({ where: { username: req.body.username, password: req.body.password } }) 
    .then(function (data) {
        // if no user with these parameters ->error
        if (data === null) { 
            return res.status(404).json({ message: "User not found: wrong username or password" });
        }
        // else, create token
        const jwtExpirySeconds = 3200
        let payload = { user_id: data.user_id, username:data.username };
        let token = jwt.sign(payload, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds,
                })
        // return token
        res.json({ "token": token, "maxAge": jwtExpirySeconds }); 
    }).catch(err => {
        res.status(500).json({ message: "Oops, there was a problem" });
    });
};

// Checker si l'utilisateur est authentifié
exports.isAuth = function (req, res, next) {
    if (typeof req.headers.authorization === "undefined") {
        res.status(401).json({ message: "Not Authorized" });
    } else {
        // retrieve token from header
        let token = req.headers.authorization.split(" ")[0];
        // check if token is valid 
        jwt.verify(token, jwtKey, (err, user) => {
            if (err) {  
                res.status(401).json({ message: "Not Authorized" });
            } else {
                // set user in request
                req.user = user; 
                return next(); 
            };
        });
    }
};
