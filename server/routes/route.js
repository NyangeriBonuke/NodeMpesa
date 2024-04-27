const express = require('express')
const router = express.Router()
const MpesaController = require('../controllers/controller')
const getAccessToken = require('../middleware/accessToken')

router.post('/stkpush', getAccessToken, MpesaController.getStkPush)

module.exports = router