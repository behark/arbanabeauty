"use client";

import React, { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/utils/stripe';

interface StripeWrapperProps {
  clientSecret: string;
  children: ReactNode;
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({ clientSecret, children }) => {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#b76e79', // Match your primary color
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
