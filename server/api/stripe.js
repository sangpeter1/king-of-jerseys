require('dotenv').config()
const STRIPE = process.env.STRIPE;
const stripe = require('stripe')(STRIPE);
const app = express();

app.post('/create-checkout-session', async (req, res) => { 
    const session = await stripe.checkout.sessions.create({
      customer_email: 'customer@example.com',
      submit_type: 'donate',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.PORT}?success=true`,
      cancel_url: `${process.env.PORT}?canceled=true`,
      automatic_tax: {enabled: true},
    });
    res.json({ url: session.url });
});
