"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaHeart, FaStar, FaEye, FaShoppingBag } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  // Get primary image or first image
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  
  // Calculate discount percentage if there's a compareAtPrice
  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : null;
  
  return (
    <>
      <div className={`group relative ${className}`}>
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label={isFavorite ? t('product.removeFromWishlist') : t('product.addToWishlist')}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={16} />
          ) : (
            <FaRegHeart className="text-gray-500 dark:text-gray-400" size={16} />
          )}
        </button>
        
        {/* Product Image with hover overlay */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Sale badge */}
          {discountPercentage && (
            <div className="absolute top-3 left-3 bg-primary px-2 py-1 rounded-md text-xs font-medium text-white">
              {t('product.sale')} {discountPercentage}%
            </div>
          )}
          
          {/* Out of stock badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                {t('product.outOfStock')}
              </span>
            </div>
          )}
          
          {/* Hover overlay with buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
            <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickViewOpen(true);
                }}
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                title={t('product.quickView')}
              >
                <FaEye size={16} />
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic would go here
                }}
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                title={t('product.addToCart')}
                disabled={!product.inStock}
              >
                <FaShoppingBag size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <Link href={`/shop/${product.slug}`}>
          <div className="mt-4 space-y-2">
            {/* Categories */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {product.categories.map(category => category.name).join(", ")}
            </div>
            
            {/* Title */}
            <h3 className="font-medium text-gray-900 dark:text-white text-md line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      size={14} 
                      className={i < Math.round(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  ({product.reviewCount})
                </span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 dark:text-white">
                {product.currency}{product.price.toFixed(2)}
              </span>
              
              {product.compareAtPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {product.currency}{product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>
        
        {/* Color variations if they exist */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-3 flex gap-1">
            {product.variants
              .filter((variant, index, self) => 
                self.findIndex(v => v.color === variant.color) === index)
              .slice(0, 4) // Show at most 4 colors
              .map((variant, i) => (
                <div 
                  key={i}
                  className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: variant.color || '#CCCCCC' }}
                  title={variant.colorName || variant.color}
                />
              ))}
            {product.variants && product.variants.length > 4 && (
              <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500">
                +{product.variants.length - 4}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQuickViewOpen(false)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Gallery */}
                <div className="md:w-1/2 p-6">
                  <div className="relative aspect-square">
                    <Image 
                      src={product.images[selectedImage].src}
                      alt={product.images[selectedImage].alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex mt-4 space-x-2 overflow-x-auto">
                      {product.images.map((image, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`cursor-pointer border-2 rounded-md overflow-hidden w-16 h-16 flex-shrink-0 ${
                            selectedImage === index 
                              ? 'border-primary' 
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.title}
                    </h2>
                    <button 
                      onClick={() => setIsQuickViewOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <IoClose size={24} />
                    </button>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {product.currency}{product.price.toFixed(2)}
                    </span>
                    
                    {product.compareAtPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {product.currency}{product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                    
                    {discountPercentage && (
                      <span className="ml-2 text-sm bg-primary px-2 py-0.5 rounded text-white">
                        {discountPercentage}% {t('product.off')}
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            size={16} 
                            className={i < Math.round(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({product.reviewCount} {t('product.reviews')})
                      </span>
                    </div>
                  )}
                  
                  {/* Description - truncated */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {product.description}
                  </p>
                  
                  {/* Color options */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('product.color')}
                      </h3>
                      <div className="flex gap-2">
                        {product.variants
                          .filter((variant, index, self) => 
                            self.findIndex(v => v.color === variant.color) === index)
                          .map((variant, i) => (
                            <div 
                              key={i}
                              className="w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform"
                              style={{ 
                                backgroundColor: variant.color || '#CCCCCC',
                                borderColor: variant.colorName ? 'rgba(0,0,0,0.2)' : 'transparent'
                              }}
                              title={variant.colorName || variant.color}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Quantity selector */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {t('product.quantity')}
                    </h3>
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md w-fit">
                      <button 
                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                        className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">
                        {selectedQuantity}
                      </span>
                      <button 
                        onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                        className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors flex items-center justify-center gap-2"
                      disabled={!product.inStock}
                    >
                      <FaShoppingBag size={16} />
                      {t('product.addToCart')}
                    </button>
                    <Link 
                      href={`/shop/${product.slug}`}
                      className="flex-1 py-2.5 px-4 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-md transition-colors text-center"
                    >
                      {t('product.viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
