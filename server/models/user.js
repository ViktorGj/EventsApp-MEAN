
const mongoose = require ('mongoose')

// create instance of the mongoose schema:
const Schema = mongoose.Schema

// new schema for the users data
const userSchema = new Schema({
    email: String,
    password: String
})

// exporting the module for the schema
// first argument is model name, we'll call it: 'user', 
// second argument is the schema: userSchema, 
// third is the collection that we create in mongoDb: 'users' (changing this parameter results in creating new collection)
// the model can be used to read, create, update, delete documents in the db
module.exports = mongoose.model('user', userSchema, 'users')
// after this we go to api.js to make the connection to the db (we deside to make it through api route - api.js)