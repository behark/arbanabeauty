import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-06-30.basil', // Use the latest API version
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'eur' } = body;
    
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret to the client side
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error: unknown) {
    console.error('Error creating payment intent:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
