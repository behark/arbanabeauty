"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductGrid from "@/components/shop/ProductGrid";
import { products, productCategories } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShopPage() {
  const { t } = useLanguage();
  
  return (
    <MainLayout>
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-4">{t('shop.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('shop.subtitle')}
            </p>
          </div>
          
          <ProductGrid 
            products={products} 
            categories={productCategories} 
            className="mt-8" 
          />
        </div>
      </div>
    </MainLayout>
  );
}
