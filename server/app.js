const express = require('express')
const mongoose = require('mongoose')
const request = require('request')
require('dotenv').config()
const router = require('./routes/route')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

require('./db')

app.listen(process.env.PORT, () => {
    console.log('Server started')
})