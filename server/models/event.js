
const mongoose = require('mongoose')

// create instance of the mongoose schema:
const Schema = mongoose.Schema

// new schema for the events data
const eventSchema = new Schema({
    title: String,
    description: String,
    date: Date
})

// exporting the module for the schema
// first argument is model name, we'll call it: 'event', 
// second argument is the schema: eventSchema, 
// third is the collection that we create in mongoDb: 'events'  
// the model can be used to read, create, update, delete documents in the db
const eventModel = mongoose.model('event', eventSchema, 'events')
module.exports = eventModel
// after this we go to api.js to make the connection to the db (we deside to make it through api route - api.js)