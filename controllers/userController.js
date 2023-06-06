const db = require('../models/index');
const User = db.User;

//créer un utilisateur
exports.createUser = async function(req, res) {
    if (Object.keys(req.body).length === 0) { 
        return res.status(400).json({ message: "Content cannot be empty!" });
    };

    let user = User.build({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password 
    });

    // If all is good then we can save new User in the database
    await user.save()
        .then(data => {
            //return json of new user
            res.json(data); 
        })
        .catch(err => {
            //error
            res.status(500).json({ message: "Oops, there was a problem" }); 
        });

        
};
