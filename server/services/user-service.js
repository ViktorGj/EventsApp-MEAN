
// require bcrypt (after npm installing) - password (data) encryption
const bcrypt = require('bcryptjs')

// instance of our token-service with methods (generateToken, verifyToken):
const tokenService = require('../services/token-service')

// require User model for mongoDb 
const User = require('../models/user')

module.exports = {

    // Save new registered user function
    saveUser: function (user, res) {
        // bcrypt.hashSync encrypts password (first parameter), and adds complexity (second parameter - 10)
        user.password = bcrypt.hashSync(user.password, 10)
        // save the user: handle the error, then send status and data (user)
        user.save((error, registeredUser) => {
            if (error) {
                console.log('error saving user: ' + error)
            } else {
                // generate token using tokenService and send success message
                const token = tokenService.generateToken(registeredUser._id)
                res.status(200).send(
                    {
                        // do not return sensitive data such as password
                        User: registeredUser.email,
                        message: 'Successful registration !',
                        token: token
                    }
                )
            }
        })
    },

    // Verify User (valid email and password) for Login
    validateUser: function (req, res, next) {
        const userData = new User(req.body)
        // check if the username exists in the DB, using findOne method that Mongoose provides:
        // passing the email from the frontend "userData.email" to compare if it exists
        // then callback method (error, user) which shows error or finds data "user"
        // lastly we handle the possible error scenarios
        User.findOne({ email: userData.email }, (error, user) => {
            if (error) {
                console.log('Login error: ' + error)
            }
            else {
                // if no users is found > 401:
                if (!user) {
                    res.status(401).send('Invalid email')
                }
                else {
                    // if password is not equal > 401:
                    // if (user.password !== userData.password)
                    const passwordMatch = bcrypt.compareSync(userData.password, user.password)
                    if (!passwordMatch) {
                        res.status(401).send('Invalid password !')
                    }
                    // lastly when we have a user and the password is correct > 200:
                    else {
                        // generate token using tokenService and send success message (sending token is optional)
                        const token = tokenService.generateToken(user._id)
                        res.status(200).send({
                            // do not return sensitive data such as password
                            user: user.email,
                            message: 'Login successful !',
                            token: token
                        })
                    }
                }
            }
        })
        next()
    },

    // Validate Register user (check if user exists)
    userExists: function (req, res, next) {
        const userData = new User(req.body)
        User.findOne({ email: userData.email }, (err, foundUser) => {
            if (err) {
                console.log('Error registering user ' + err)
            }
            else if (foundUser) {
                return res.status(409).send('User already exists !')
            } else if (!foundUser) {
                userService.saveUser(user, res)
            }
        })
        next()
    }

}