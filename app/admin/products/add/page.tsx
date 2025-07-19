"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthCheck from "@/components/admin/AdminAuthCheck";
import ProductForm from "@/components/admin/ProductForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AddProductPage() {
  const { t } = useLanguage();

  return (
    <AdminAuthCheck>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{t('admin.products.addNew')}</h1>
          </div>
          
          <ProductForm mode="add" />
        </div>
      </AdminLayout>
    </AdminAuthCheck>
  );
}
