"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthCheck from "@/components/admin/AdminAuthCheck";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EditProductPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params.id as string;

  // Load the product data
  useEffect(() => {
    const loadProduct = () => {
      try {
        const savedProducts = localStorage.getItem("adminProducts");
        if (savedProducts) {
          const products: Product[] = JSON.parse(savedProducts);
          const foundProduct = products.find(p => p.id === productId);
          
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError(t('admin.products.productNotFound'));
            setTimeout(() => {
              router.push("/admin/products");
            }, 3000);
          }
        } else {
          setError(t('admin.products.noProductsFound'));
          setTimeout(() => {
            router.push("/admin/products");
          }, 3000);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        setError(t('admin.products.loadError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, router, t]);

  return (
    <AdminAuthCheck>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {isLoading ? t('admin.loading') : (
                error ? t('admin.error') : t('admin.products.editProduct')
              )}
            </h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p>{error}</p>
              <p className="text-sm mt-2">{t('admin.redirecting')}</p>
            </div>
          ) : product ? (
            <ProductForm product={product} mode="edit" />
          ) : null}
        </div>
      </AdminLayout>
    </AdminAuthCheck>
  );
}
