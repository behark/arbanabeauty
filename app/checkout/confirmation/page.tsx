"use client";

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

function CheckoutConfirmationContent() {
  const { t } = useLanguage();
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const paymentStatus = searchParams.get('redirect_status');
  
  useEffect(() => {
    // Clear the cart when arriving at confirmation page with successful payment
    if (paymentStatus === 'succeeded') {
      clearCart();
    }
  }, [paymentStatus, clearCart]);

  return (
    <MainLayout>
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            {paymentStatus === 'succeeded' ? (
              <div className="py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{t('checkout.orderConfirmed')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('checkout.orderConfirmationMessage')}
                </p>
                <p className="font-medium mb-6">
                  {t('checkout.orderNumber')}: AB-{paymentIntentId?.substring(3, 9) || Math.floor(100000 + Math.random() * 900000)}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/" className="btn-primary">
                    {t('checkout.backToHome')}
                  </Link>
                  <Link href="/shop" className="btn-outline">
                    {t('checkout.continueShopping')}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{t('checkout.paymentPending')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('checkout.paymentPendingMessage')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/" className="btn-primary">
                    {t('checkout.backToHome')}
                  </Link>
                  <Link href="/checkout" className="btn-outline">
                    {t('checkout.tryAgain')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function CheckoutConfirmation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutConfirmationContent />
    </Suspense>
  );
}
