const axios = require('axios')
require('dotenv').config()

class MpesaController{
    async getStkPush(req, res){
        try{
            const {phone, amount} = req.body
            const shortCode = process.env.SHORT_CODE
            const phoneNumber = phone.substring(1)
            const passkey = process.env.PASS_KEY
            const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
            const timestamp = new Date().toISOString().replace(/[-T:]/g, "").split(".")[0];
            const password = new Buffer.from(shortCode + passkey + timestamp).toString("base64")
            const data = {    
                BusinessShortCode: process.env.SHORT_CODE,    
                Password: password,    
                Timestamp: timestamp,    
                TransactionType: "CustomerPayBillOnline",    
                Amount: amount,   
                PartyA: `254${phoneNumber}`,    
                PartyB: process.env.SHORT_CODE,    
                PhoneNumber: `254${phoneNumber}`,    
                CallBackURL: "https://3e13-41-90-180-156.ngrok-free.app/callback",    
                AccountReference: "Test",    
                TransactionDesc: "Test"
            }

            const token = req.access_token
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res.status(200).json(response.data)
        }
        catch(error){
            res.status(500).json(error)
        }    
    }

    async callback(req, res){
        try{
            const callbackData = req.body
            if(callbackData){
                console.log(callbackData)
                res.status(200).json(callbackData)
            }
            else{
                throw new Error('No data received')
            }
        }
        catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = new MpesaController