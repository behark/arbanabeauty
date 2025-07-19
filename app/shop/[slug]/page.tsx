"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/shop/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const { t } = useLanguage();
  const slug = params.slug as string;

  // Find the product with matching slug
  const product = products.find(p => p.slug === slug);
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }
  
  const [selectedImage, setSelectedImage] = useState(
    product.images.find(img => img.isPrimary) || product.images[0]
  );
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find(v => v.isDefault) || product.variants?.[0]
  );
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get related products from the same category
  const relatedProducts = products
    .filter(p => 
      p.id !== product.id && 
      p.categories.some(c => product.categories.some(pc => pc.id === c.id))
    )
    .slice(0, 4);
  
  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };
  
  return (
    <MainLayout>
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex text-sm mb-6 text-gray-500 dark:text-gray-400">
            <Link href="/shop" className="flex items-center hover:text-primary">
              <FaArrowLeft className="mr-2" />
              {t('product.backToShop')}
            </Link>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                <Image 
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Thumbnail gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((image) => (
                    <div 
                      key={image.id}
                      onClick={() => setSelectedImage(image)}
                      className={`relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer ${
                        selectedImage.id === image.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 20vw, 10vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              {/* Categories */}
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {product.categories.map(category => category.name).join(", ")}
              </div>
              
              {/* Title */}
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        size={18} 
                        className={i < Math.round(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                    {product.reviewCount} {t('product.reviews')}
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">
                  {product.currency}{(selectedVariant?.price || product.price).toFixed(2)}
                </span>
                
                {product.compareAtPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {product.currency}{product.compareAtPrice.toFixed(2)}
                  </span>
                )}
                
                {product.compareAtPrice && (
                  <span className="ml-3 text-sm text-primary font-medium">
                    {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% {t('product.off')}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6 text-gray-700 dark:text-gray-300">
                <p>{product.description}</p>
              </div>
              
              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">{t('product.selectVariant')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 border rounded-md text-sm ${
                          selectedVariant?.id === variant.id
                            ? 'border-primary text-primary bg-primary bg-opacity-10'
                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">{t('product.quantity')}</h3>
                <div className="flex w-36 border border-gray-300 dark:border-gray-700 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-12 text-center py-2 border-r border-gray-300 dark:border-gray-700"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="w-12 text-center py-2 border-none focus:ring-0 bg-transparent"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-12 text-center py-2 border-l border-gray-300 dark:border-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
                  disabled={!product.inStock}
                >
                  <FaShoppingCart size={18} />
                  {t('product.addToCart')}
                </button>
                
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {isFavorite ? (
                    <>
                      <FaHeart className="text-primary" size={18} />
                      {t('product.removeFromWishlist')}
                    </>
                  ) : (
                    <>
                      <FaRegHeart size={18} />
                      {t('product.addToWishlist')}
                    </>
                  )}
                </button>
              </div>
              
              {/* Product meta */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('product.sku')}:</span> {selectedVariant?.sku || 'N/A'}
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('product.category')}:</span> {product.categories.map(c => c.name).join(", ")}
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('product.availability')}:</span> {product.inStock ? t('product.inStock') : t('product.outOfStock')}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('product.relatedProducts')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
