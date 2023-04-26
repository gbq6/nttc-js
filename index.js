const functions = require('firebase-functions')
const express = require('express')
const app = express()
const convert = require('./converter')

app.get('/:number', (request, response) => {
    var result
    try {
        result = convert(request.params.number)
    } catch (error) {
        result = error
    }
    response.send(result)
})

exports.app = functions.https.onRequest(app)
