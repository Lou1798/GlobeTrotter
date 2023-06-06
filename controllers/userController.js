const db = require('../models/index');
const User = db.User;

exports.login = async function (req, res, next) {
    const jwt = require("jsonwebtoken")
    const jwtKey = "my_secret_key"
    const jwtExpirySeconds = 300

    let payload = { id: user.iduser };
    let token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000 });
    res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });}