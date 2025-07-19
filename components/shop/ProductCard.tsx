"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  // Get primary image or first image
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  
  // Calculate discount percentage if there's a compareAtPrice
  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : null;
  
  return (
    <div className={`group relative ${className}`}>
      {/* Favorite button */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
        aria-label={isFavorite ? t('product.removeFromWishlist') : t('product.addToWishlist')}
      >
        {isFavorite ? (
          <FaHeart className="text-red-500" size={18} />
        ) : (
          <FaRegHeart className="text-gray-500 dark:text-gray-400" size={18} />
        )}
      </button>
      
      {/* Product Link & Image */}
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden rounded-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
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
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="mt-4 space-y-2">
        {/* Categories */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {product.categories.map(category => category.name).join(", ")}
        </div>
        
        {/* Title */}
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-medium text-gray-900 dark:text-white text-md line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
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
        
        {/* Add to Cart Button */}
        <button 
          className="w-full py-2 mt-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
          disabled={!product.inStock}
        >
          {t('product.addToCart')}
        </button>
      </div>
    </div>
  );
}
