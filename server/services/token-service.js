
// require JWT
const jwt = require('jsonwebtoken')

module.exports = {

    // Create token
    generateToken: function (userId) {
        // payload - obj. containing user id (._id property is generated in mongoDb when posting new user)
        const payload = { subject: userId }
        // register and login create the same token because of the same payload and secretKey
        const token = jwt.sign(payload, 'secretKey')
        return token
    },

    // VERIFY TOKEN function (middleware)
    // "next" - next() - calls the next function and passes the request
    verifyToken: function (req, res, next) {
        // 1. check if there is: authorization in header 
        // 2. token === null 
        // 3. jwt.verify token

        // 1. check if there's authorization key in the headers
        if (!req.headers.authorization) {
            // if theres's no authorization send 401
            return res.status(401).send('Unauthorized request')
        }
        // 2. check if the token is not present (written as 'null' string)
        // extract the token value from the bearer token
        // 'Bearer token' is split by empty space - [0] is Bearer string, [1] is the token
        let token = req.headers.authorization.split(' ')[1]
        if (token === 'null') {
            return res.status(401).send('Unauthorized request')
        }
        // 3. If the token is invalid verify method returns null (payload is empty):
        let payload = jwt.verify(token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }
        // If all conditions pass we set the req.userId with payload.subject (because payload = {subject: userId)
        req.userId = payload.subject
        next()
        // then use it in special events route (verify token in function parameters...)
    }


}


