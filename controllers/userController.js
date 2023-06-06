const db = require('../models/index');
const User = db.User;

exports.createUser = async function(req, res) {
    // Validate request
    
    if (Object.keys(req.body).length === 0) { // checks if body is not empty
        return res.status(400).json({ message: "Content cannot be empty!" });
    };
    console.log(req.body);
    // Create a User (non-persistent)
    let user = User.build({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password 
    });
    console.log(user);
    // Save User in the database
    await user.save()
        .then(data => {
            res.json(data); // return json of user
        })
        .catch(err => {
            res.status(500).json({ message: "Sorry, something went wrong..." }); 
        });

        
};
