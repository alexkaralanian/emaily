import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from "react-redux"
import * as actions from '../actions'

// StripeCheckout props:
// amount={} // defaults to $USD, the amount is in CENTS, so $5 = 500 
// token = a callback which gets called once we successfully recieve back the token from Stripe
	// The return value is an OBJECT which represents the entire charge
// stripeKey shoudl be in our process.env
	// fake cc# : 4242 - 4242 - 4242 - 4242
//name + decription - string

// W can also pass a child component to use as the button to render vs the deafult styled button 

class Payments extends Component {
	render(){


		return (
			<StripeCheckout 
				name="Emaily"
				description="$5 for 5 Email Credits"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">
					Add Credits
				</button>
			</StripeCheckout>
		)
	}
}

export default connect(null, actions)(Payments)


