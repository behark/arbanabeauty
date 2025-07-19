"use client";

import React, { useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaSearch, FaFilter } from "react-icons/fa";

interface ProductGridProps {
  products: Product[];
  categories?: { id: string; name: string; slug: string }[];
  className?: string;
}

export default function ProductGrid({ 
  products,
  categories = [],
  className = "" 
}: ProductGridProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
                           product.categories.some(cat => cat.id === selectedCategory);
                           
    return matchesSearch && matchesCategory;
  });
  
  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "featured":
      default:
        return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
    }
  });
  
  return (
    <div className={className}>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
        >
          <FaFilter />
          {t('shop.filters')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className={`md:col-span-1 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            {/* Search */}
            <div>
              <h3 className="font-medium mb-2">{t('shop.search')}</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={t('shop.searchPlaceholder')}
                />
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
              </div>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2">{t('shop.categories')}</h3>
              <div className="space-y-2">
                <div 
                  onClick={() => setSelectedCategory(null)}
                  className={`cursor-pointer py-1 px-2 rounded-md text-sm ${
                    selectedCategory === null 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('shop.allCategories')}
                </div>
                
                {categories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`cursor-pointer py-1 px-2 rounded-md text-sm ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sort */}
            <div>
              <h3 className="font-medium mb-2">{t('shop.sortBy')}</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="featured">{t('shop.sortFeatured')}</option>
                <option value="price-low">{t('shop.sortPriceLow')}</option>
                <option value="price-high">{t('shop.sortPriceHigh')}</option>
                <option value="newest">{t('shop.sortNewest')}</option>
                <option value="rating">{t('shop.sortRating')}</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="md:col-span-3">
          {/* Results count and sort (mobile) */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('shop.showing')} {sortedProducts.length} {t('shop.of')} {products.length} {t('shop.products')}
            </p>
            
            <div className="md:hidden mt-2 w-full">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="featured">{t('shop.sortFeatured')}</option>
                <option value="price-low">{t('shop.sortPriceLow')}</option>
                <option value="price-high">{t('shop.sortPriceHigh')}</option>
                <option value="newest">{t('shop.sortNewest')}</option>
                <option value="rating">{t('shop.sortRating')}</option>
              </select>
            </div>
          </div>
          
          {/* Products */}
          {sortedProducts.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 py-12 px-6 rounded-lg text-center">
              <p className="text-lg mb-4">{t('shop.noProductsFound')}</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="text-primary hover:underline"
              >
                {t('shop.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
