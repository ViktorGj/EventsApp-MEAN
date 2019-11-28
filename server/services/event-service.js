// SPECIAL events endpoints

const express = require('express')
const router = express.Router()

// instance of our token-service with methods (generateToken, verifyToken):
const tokenService = require('../services/token-service')

// Event model
const Event = require('../models/event')


// GET - special events
// when we request '/special' first verifyToken is called (from token-service.js), and with next() it calls the code after
// if "verifyToken" returns 401 the rest of the code is not executed
router.get('/', tokenService.verifyToken, (req, res) => {
    Event.find((err, doc) => {
        if (err) {
            res.send('Error getting special events')
        } else {
            // doc - array of events
            res.status(200).json(doc)
        }
    })

})

// POST - create special event
router.post('/create', (req, res) => {
    const event = new Event(req.body)
    event.save((err, savedEvent) => {
        if (err) {
            res.status(422).send(err)
        } else {
            res.status(200).send(
                {
                    message: 'Event saved successfully',
                    event: savedEvent
                }
            )
        }
    })
})

// pre route to DELETE that finds event and passes it to req, and next passes it to the same route for DELETE call
// do this for reusable code purpose
router.use('/delete/:eventId', (req, res, next) => {
    const id = req.params.eventId
    Event.findById(id, (err, event) => {
        err
            ? res.status(500).send(err)
            : req.event = event
        next()
    })
})

// DELETE event
// now we have event in the request (set in req previously - findById...), and perform .remove operation
router.delete('/delete/:eventId', (req, res) => {
    req.event.remove(err => {
        err
            ? res.status(500).send(err)
            : res.status(200).send({ message: 'Event removed !' })
    })
})

// GET - one event
router.get('/:eventId', (req, res) => {
    const id = req.params.eventId
    Event.findById(id, (err, event) => {
        err
            ? res.status(500).send('Event not found !')
            : res.status(200).json(event)
    })
})

// Update event
router.put('/update', (req, res) => {
    const newEvent = new Event(req.body)
    // putting res again in second callback (err, RES) overwrites the res and throws an error
    // res is accessible already from the general scope
    Event.findOneAndUpdate({ _id: newEvent._id }, newEvent, (err) => {
        err
            ? res.status(500).send('Update failed !')
            : res.status(200).json('Update successful')
    })
})




// eporting the router to be used in server then 
module.exports = router;