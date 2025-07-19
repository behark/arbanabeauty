"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import StripeWrapper from "@/components/checkout/StripeWrapper";
import StripePaymentForm from "@/components/checkout/StripePaymentForm";

type CheckoutStep = "information" | "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  
  const shippingCost = formData.shippingMethod === "express" ? 15 : 5;
  const total = subtotal + shippingCost;

  // Move useEffect before any conditional returns
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (currentStep === "payment" && formData.paymentMethod === "card") {
      setIsProcessing(true);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, currency: "eur" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setIsProcessing(false);
        })
        .catch((error) => {
          console.error("Error loading payment intent:", error);
          setIsProcessing(false);
        });
    }
  }, [currentStep, formData.paymentMethod, total]);

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="py-20 bg-white dark:bg-gray-900">
          <div className="container-custom max-w-4xl">
            <div className="text-center py-16">
              <h1 className="heading-xl mb-4">{t('checkout.emptyCart')}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {t('checkout.emptyCartMessage')}
              </p>
              <Link
                href="/shop"
                className="btn-primary"
              >
                {t('checkout.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // useEffect moved above to avoid conditional Hook call

  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    setCurrentStep("confirmation");
    clearCart();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === "information") {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      if (formData.paymentMethod === "cashOnDelivery" || formData.paymentMethod === "paypal") {
        // For payment methods other than credit card
        setCurrentStep("confirmation");
        clearCart();
      }
      // For card payments, the StripePaymentForm will handle submission
    }
  };

  // Shipping cost and total moved above for use in useEffect

  return (
    <MainLayout>
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex text-sm mb-6 text-gray-500 dark:text-gray-400">
            <Link href="/shop" className="flex items-center hover:text-primary">
              <FaArrowLeft className="mr-2" />
              {t('checkout.backToShop')}
            </Link>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Checkout Form */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {currentStep === "confirmation" ? (
                  <div className="py-8 text-center">
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
                      {t('checkout.orderNumber')}: AB-{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                    <Link href="/" className="btn-primary">
                      {t('checkout.backToHome')}
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex mb-4">
                        {["information", "shipping", "payment"].map((step, index) => (
                          <div key={step} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentStep === step
                                  ? "bg-primary text-white"
                                  : index < ["information", "shipping", "payment"].indexOf(currentStep)
                                  ? "bg-primary/20 text-primary"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span
                              className={`ml-2 text-sm font-medium ${
                                currentStep === step
                                  ? "text-primary"
                                  : "text-gray-500"
                              }`}
                            >
                              {t(`checkout.steps.${step}`)}
                            </span>
                            {index < 2 && (
                              <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-600 mx-2" />
                            )}
                          </div>
                        ))}
                      </div>

                      <h2 className="text-xl font-bold mb-4">
                        {t(`checkout.steps.${currentStep}`)}
                      </h2>
                    </div>

                    {currentStep === "information" && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            {t('checkout.email')} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                              {t('checkout.firstName')} *
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                              {t('checkout.lastName')} *
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-medium mb-1">
                            {t('checkout.address')} *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium mb-1">
                              {t('checkout.city')} *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                              {t('checkout.postalCode')} *
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium mb-1">
                            {t('checkout.country')} *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                          >
                            <option value="">{t('checkout.selectCountry')}</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Albania">Albania</option>
                            <option value="North Macedonia">North Macedonia</option>
                            <option value="Montenegro">Montenegro</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            {t('checkout.phone')}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === "shipping" && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 flex items-center">
                            <input
                              type="radio"
                              id="standard"
                              name="shippingMethod"
                              value="standard"
                              checked={formData.shippingMethod === "standard"}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <label htmlFor="standard" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t('checkout.standardShipping')}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {t('checkout.standardShippingDescription')}
                              </div>
                            </label>
                            <div className="font-medium">€5.00</div>
                          </div>

                          <div className="border rounded-md p-4 flex items-center">
                            <input
                              type="radio"
                              id="express"
                              name="shippingMethod"
                              value="express"
                              checked={formData.shippingMethod === "express"}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <label htmlFor="express" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t('checkout.expressShipping')}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {t('checkout.expressShippingDescription')}
                              </div>
                            </label>
                            <div className="font-medium">€15.00</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === "payment" && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 flex items-center">
                            <input
                              type="radio"
                              id="card"
                              name="paymentMethod"
                              value="card"
                              checked={formData.paymentMethod === "card"}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t('checkout.creditCard')}</div>
                            </label>
                            <div className="flex space-x-2">
                              <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                          </div>

                          <div className="border rounded-md p-4 flex items-center">
                            <input
                              type="radio"
                              id="paypal"
                              name="paymentMethod"
                              value="paypal"
                              checked={formData.paymentMethod === "paypal"}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <label htmlFor="paypal" className="flex-1 cursor-pointer">
                              <div className="font-medium">PayPal</div>
                            </label>
                            <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>

                          <div className="border rounded-md p-4 flex items-center">
                            <input
                              type="radio"
                              id="cashOnDelivery"
                              name="paymentMethod"
                              value="cashOnDelivery"
                              checked={formData.paymentMethod === "cashOnDelivery"}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <label htmlFor="cashOnDelivery" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t('checkout.cashOnDelivery')}</div>
                            </label>
                          </div>
                        </div>

                        {formData.paymentMethod === "card" && clientSecret && (
                          <div className="space-y-4">
                            <StripeWrapper clientSecret={clientSecret}>
                              <StripePaymentForm onSuccess={handlePaymentSuccess} />
                            </StripeWrapper>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
                      >
                        {currentStep === "payment" 
                          ? t('checkout.placeOrder')
                          : t('checkout.continue')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">{t('checkout.orderSummary')}</h3>
                <div className="divide-y dark:divide-gray-700">
                  <div className="max-h-80 overflow-auto pb-4">
                    {items.map((item) => {
                      const itemPrice = item.variant ? item.variant.price : item.product.price;
                      const totalPrice = itemPrice * item.quantity;
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0];

                      return (
                        <div key={`${item.product.id}-${item.variant?.id || ''}`} className="flex py-3">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden mr-4 relative flex-shrink-0">
                            <Image
                              src={primaryImage.src}
                              alt={primaryImage.alt}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                            <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-2">{item.product.title}</h4>
                            {item.variant && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.variant.name}
                              </p>
                            )}
                          </div>
                          <div className="font-medium ml-4">
                            {item.product.currency}{totalPrice.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="py-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t('checkout.subtotal')}</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t('checkout.shipping')}</span>
                      <span>€{shippingCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('checkout.total')}</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {t('checkout.taxIncluded')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
