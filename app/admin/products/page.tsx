"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthCheck from "@/components/admin/AdminAuthCheck";
import { Product, ProductCategory } from "@/types/product";
import { products as initialProducts, productCategories } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminProductsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  // Auth check wrapper
  return (
    <AdminAuthCheck>
      <ProductsManager />
    </AdminAuthCheck>
  );
}

function ProductsManager() {
  const { t } = useLanguage();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"title" | "price" | "date">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Load products from localStorage or use initial data
  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem("adminProducts");
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          setProducts(initialProducts);
          localStorage.setItem("adminProducts", JSON.stringify(initialProducts));
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts(initialProducts);
      }
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("adminProducts", JSON.stringify(products));
    }
  }, [products, isLoading]);

  // Handle deletion of a product
  const handleDeleteProduct = (productId: string) => {
    if (confirm(t('admin.products.deleteConfirm'))) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Handle editing a product
  const handleEditProduct = (productId: string) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || 
      product.categories.some(category => category.id === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === "price") {
      return sortDirection === "asc" 
        ? a.price - b.price
        : b.price - a.price;
    } else {
      // Default sort by date (using id as proxy for now)
      return sortDirection === "asc" 
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
  });

  // Handle sort toggle
  const handleSort = (field: "title" | "price" | "date") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('admin.products.title')}</h1>
          <button
            onClick={() => router.push("/admin/products/add")}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus size={18} />
            {t('admin.products.addNew')}
          </button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('admin.products.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          
          <div className="flex-1 md:max-w-xs">
            <div className="relative">
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full p-2 border rounded-md appearance-none pr-10 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">{t('admin.products.allCategories')}</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.products.image')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center">
                    {t('admin.products.name')}
                    {sortField === "title" ? (
                      sortDirection === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    ) : null}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    {t('admin.products.price')}
                    {sortField === "price" ? (
                      sortDirection === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    ) : null}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.products.category')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.products.status')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.products.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    {t('admin.loading')}...
                  </td>
                </tr>
              ) : sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    {t('admin.products.noProducts')}
                  </td>
                </tr>
              ) : (
                sortedProducts.map((product) => {
                  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <Image
                            src={primaryImage.src}
                            alt={primaryImage.alt}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: {product.sku || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.currency}{product.price.toFixed(2)}
                        </div>
                        {product.compareAtPrice && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                            {product.currency}{product.compareAtPrice.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.categories.map(c => c.name).join(", ")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {product.inStock ? t('admin.products.inStock') : t('admin.products.outOfStock')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditProduct(product.id)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
