"use client";

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FaSpinner } from 'react-icons/fa';

interface StripePaymentFormProps {
  onSuccess: () => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);
    setErrorMessage(undefined);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmation`,
      },
      redirect: 'if_required',
    });

    if (error) {
      // Show error to your customer
      setErrorMessage(error.message);
      setIsLoading(false);
    } else {
      // Your customer will be redirected to your return_url or
      // we'll handle the success here
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!stripe || !elements ? (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin h-8 w-8 text-primary" />
          <span className="ml-2">Loading payment form...</span>
        </div>
      ) : (
        <>
          <PaymentElement />
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={!stripe || isLoading}
              className="w-full btn-primary py-3 text-center flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin h-4 w-4 mr-2" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
          
          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 text-red-600 dark:text-red-400 mt-4">
              {errorMessage}
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default StripePaymentForm;
