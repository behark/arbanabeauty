"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { t } = useLanguage();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-bold text-lg">{t('cart.title')}</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close cart"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Empty State */}
            {items.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <p className="mb-2 font-medium">{t('cart.empty')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                  {t('cart.emptyMessage')}
                </p>
                <Link 
                  href="/shop" 
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  {t('cart.continueShopping')}
                </Link>
              </div>
            )}

            {/* Cart Items */}
            {items.length > 0 && (
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4 px-4">
                  {items.map((item) => {
                    const itemPrice = item.variant ? item.variant.price : item.product.price;
                    const totalPrice = itemPrice * item.quantity;
                    const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0];
                    
                    return (
                      <div key={`${item.product.id}-${item.variant?.id || ''}`} className="flex border-b dark:border-gray-700 pb-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mr-4">
                          <div className="relative w-full h-full">
                            <Image
                              src={primaryImage.src}
                              alt={primaryImage.alt}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <Link 
                              href={`/shop/${item.product.slug}`}
                              className="font-medium hover:text-primary transition-colors line-clamp-2"
                              onClick={() => setIsCartOpen(false)}
                            >
                              {item.product.title}
                            </Link>
                            <button
                              onClick={() => removeItem(item.product.id, item.variant?.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label={`Remove ${item.product.title} from cart`}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                          
                          {item.variant && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {item.variant.name}
                            </span>
                          )}
                          
                          <div className="flex justify-between items-center mt-auto">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1),
                                  item.variant?.id
                                )}
                                className="px-2 py-1"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="px-2 py-1 min-w-[30px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.variant?.id
                                )}
                                className="px-2 py-1"
                                aria-label="Increase quantity"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>
                            <span className="font-medium">
                              {item.product.currency}{totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t dark:border-gray-700 p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between font-medium">
                  <span>{t('cart.subtotal')}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                
                {/* Shipping - can be expanded with shipping options */}
                <div className="flex justify-between text-sm">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.calculatedAtCheckout')}</span>
                </div>
                
                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-3 bg-primary text-white text-center font-medium rounded-md hover:bg-primary-dark transition-colors"
                >
                  {t('cart.checkout')}
                </Link>
                
                {/* Continue shopping */}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-3 border border-gray-300 dark:border-gray-700 text-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {t('cart.continueShopping')}
                </button>
                
                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors flex mx-auto"
                >
                  <FiTrash2 size={14} className="mr-1" />
                  {t('cart.clearCart')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
