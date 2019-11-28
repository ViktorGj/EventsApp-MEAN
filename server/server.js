const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000
// web server
const app = express()

//CORS
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
// It allows communication between different ports such as our frontend port 4200 with backend port 3000.
// first: npm i --save cors then:
const cors = require('cors')
app.use(cors())

// route to the api.js file
const api = require('./routes/api')

// middleware that handles form data like user registration or login
app.use(bodyParser.json())

// creating endpoint /api that uses the api constant (route)
// so when we go to localhost:3000/api api.js is called and in it the get method which gives a response: Sent from API route
app.use('/api', api)

// route to events.js
const events = require('./routes/events')
app.use('/api/special', events)

app.get('/', (req, res) =>
  res.send('Hello from Server on "localhost:3000" - AUTHENTICATION'))

app.listen(PORT, () =>
  console.log('Server running on localhost: ', PORT))


module.exports = app


