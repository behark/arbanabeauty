"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { FiShoppingCart, FiHeart, FiStar, FiInfo, FiTruck, FiShield } from "react-icons/fi";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Flawless Foundation",
      category: "foundation",
      price: "€45",
      originalPrice: "€55",
      rating: 4.8,
      reviews: 124,
      description: "Long-lasting, full-coverage foundation for all skin types",
      features: ["24-hour wear", "SPF 30", "All skin types", "Buildable coverage"],
      image: "/images/products/foundation.jpg",
      bestseller: true
    },
    {
      id: 2,
      name: "Velvet Matte Lipstick",
      category: "lips",
      price: "€28",
      rating: 4.9,
      reviews: 89,
      description: "Ultra-pigmented matte lipstick with comfortable wear",
      features: ["Long-lasting", "Transfer-proof", "Vitamin E enriched", "Cruelty-free"],
      image: "/images/products/lipstick.jpg",
      new: true
    },
    {
      id: 3,
      name: "Luminous Highlighter",
      category: "face",
      price: "€32",
      rating: 4.7,
      reviews: 156,
      description: "Buildable highlighter for a natural to intense glow",
      features: ["Buildable formula", "Natural finish", "Finely milled", "Suitable for all skin tones"],
      image: "/images/products/highlighter.jpg"
    },
    {
      id: 4,
      name: "Precision Eyeliner",
      category: "eyes",
      price: "€22",
      rating: 4.6,
      reviews: 203,
      description: "Waterproof precision eyeliner for perfect lines",
      features: ["Waterproof", "Smudge-proof", "Fine tip", "Intense black"],
      image: "/images/products/eyeliner.jpg"
    },
    {
      id: 5,
      name: "Professional Brush Set",
      category: "tools",
      price: "€89",
      originalPrice: "€120",
      rating: 4.9,
      reviews: 67,
      description: "Complete 12-piece professional makeup brush set",
      features: ["Synthetic bristles", "Ergonomic handles", "Travel case included", "Professional quality"],
      image: "/images/products/brushes.jpg",
      bestseller: true
    },
    {
      id: 6,
      name: "Eyeshadow Palette",
      category: "eyes",
      price: "€38",
      rating: 4.8,
      reviews: 145,
      description: "18-shade eyeshadow palette with versatile finishes",
      features: ["18 shades", "Matte & shimmer", "Highly pigmented", "Blendable formula"],
      image: "/images/products/eyeshadow.jpg"
    }
  ];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "foundation", label: "Foundation" },
    { id: "eyes", label: "Eyes" },
    { id: "lips", label: "Lips" },
    { id: "face", label: "Face" },
    { id: "tools", label: "Tools" }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-accent">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="heading-xl mb-6">Beauty Products</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our curated collection of premium beauty products. Each item is carefully selected for quality, performance, and ethical standards.
              </p>
            </motion.div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: FiTruck, title: "Free Shipping", description: "On orders over €50" },
                { icon: FiShield, title: "Quality Guarantee", description: "100% authentic products" },
                { icon: FiHeart, title: "Cruelty-Free", description: "Ethically sourced beauty" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-lg shadow-md"
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Filter */}
        <section className="pb-8">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-primary/10 border border-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20">
          <div className="container-custom">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  {/* Product Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.bestseller && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                    {product.new && (
                      <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      {product.name}
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <FiHeart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 2 && (
                          <span className="text-xs text-primary cursor-pointer">
                            +{product.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="btn-primary flex-1">
                        <FiShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                      <button className="btn-secondary p-3">
                        <FiInfo className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-6">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Be the first to know about new products, exclusive offers, and beauty tips.
              </p>
              
              <div className="max-w-md mx-auto flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="btn-secondary bg-white text-primary hover:bg-gray-100 px-6">
                  Subscribe
                </button>
              </div>

              <p className="text-sm opacity-75 mt-4">
                Join 1000+ beauty enthusiasts who trust our recommendations
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
