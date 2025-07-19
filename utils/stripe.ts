import { loadStripe, Stripe } from '@stripe/stripe-js';

// Load Stripe outside of a component's render to avoid
// recreating the Stripe object on every render
// Replace this with your actual publishable key from the Stripe Dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export { stripePromise };
