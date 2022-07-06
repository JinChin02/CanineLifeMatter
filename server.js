// const express = require("express")
// const app = express()
// const stripe = require("stripe")('sk_test_51LGoqIEuGrCFXQM1Wa8D9VLg12WYIrHHcx0kLD9cbAxm6UYFzix1tY7qDoUd2fnPDVv5u2ikyCnb1LIpcyrMRprg00JltmaE84')
// const bodyParser = require("body-parser")

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// app.post("/donation", async (req,res) => {
//     let{amount , id } = req.body
//     try{
//         const payment = await stripe.paymentIntents.create({
//             amount,
//             currency : "CAD", 
//             description : "CLM Donation",
//             automatic_payment_methods:{
//                 enabled: true
//             },
//         })
//         console.log("Payment" , payment)
//         res.json({
//             message: "Donation Successful",
//             success: true
//         })

//     }catch(error){
//         console.log("Error" , error )
//         res.json({
//             message: "Donation Failed",
//             success:false
//         })
//     }
// })

const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LGoqIEuGrCFXQM1Wa8D9VLg12WYIrHHcx0kLD9cbAxm6UYFzix1tY7qDoUd2fnPDVv5u2ikyCnb1LIpcyrMRprg00JltmaE84');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "CAD",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4000, () => console.log("Node server listening on port 4000!"));



// app.listen(process.env.PORT || 4000, ()=>{
//     console.log("Server running on port 4000")
// })