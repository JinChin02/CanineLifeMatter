const express = require("express")
const app = express()
const stripe = require("stripe")('sk_test_51LGoqIEuGrCFXQM1Wa8D9VLg12WYIrHHcx0kLD9cbAxm6UYFzix1tY7qDoUd2fnPDVv5u2ikyCnb1LIpcyrMRprg00JltmaE84')
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post("/donation", async (req,res) => {
    let{amount , id } = req.body
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency : "CAD", 
            description : "CLM Donation",
            automatic_payment_methods:{
                enabled: true
            },
        })
        console.log("Payment" , payment)
        res.json({
            message: "Donation Successful",
            success: true
        })

    }catch(error){
        console.log("Error" , error )
        res.json({
            message: "Donation Failed",
            success:false
        })
    }
})



app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server running on port 4000")
})