// npm install stripe --save (backend helper library) - stripe api wrapper
// to charge a CC, we create a charge object
// can copy/past the code out of Stripe docs
const keys = require("../config/keys")
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY)
const requireAuth = require("../middlewares/requireAuth")
// pass in our secret key


module.exports = app => {
	app.post("/api/stripe", requireAuth, async (req, res) => {

		// console.log(req.body) // .body is a property added to req by body-parser!

		if(!req.user) {
			return res.status(401).send({error: "Must be logged in!"})
		}

		const charge = await stripe.charges.create({
			amount: 500, // cents
			currency: 'usd',
			source: req.body.id,
			description: 'whateverrr',	
		})
		req.user.credits += 5
		const user = await req.user.save()
		res.send(user)	
	})
}