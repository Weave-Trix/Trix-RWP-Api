
import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

const stripe = new Stripe('sk_test_51KVK8VLgmHChReqDOPOeshI8VS31yGUvYf74k3tgh4bnfZyr1LqYu8NjNJuPkMh3cRP3aXJJ9JawOBOF32BLFZq4004JZhuHqH');


router.post("/", (req, res) => {
    console.log("arrived at stripe end...");
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "myr",
        }, (stripeErr, stripeRes) => {
            if (stripeErr) {
                console.log("bad ruka")
                console.log(stripeErr)
                res.status(500).json(stripeErr);
            } else {
                console.log(stripeRes + "stripe success...")
                res.status(200).json(stripeRes);
            }
        }
    );
})

export default router;