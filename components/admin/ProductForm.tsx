"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiPlus, FiX, FiSave, FiImage, FiTrash } from "react-icons/fi";
import { Product, ProductCategory, ProductImage } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import { productCategories } from "@/data/products";
import { generateUniqueId } from "@/utils/helpers";

type ProductFormProps = {
  product?: Product;
  mode: "add" | "edit";
};

export default function ProductForm({ product, mode }: ProductFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  
  // Initialize form state with default values or existing product
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    title: product?.title || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price || 0,
    compareAtPrice: product?.compareAtPrice || 0,
    currency: product?.currency || "€",
    inStock: product?.inStock ?? true,
    sku: product?.sku || "",
    categories: product?.categories || [],
    images: product?.images || [],
    features: product?.features || []
  });

  const [featuresInput, setFeaturesInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
      }));
    }
  }, [formData.title]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === "inStock" && "checked" in e.target) {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name === "price" || name === "compareAtPrice") {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedCategories = selectedOptions.map(option => {
      const categoryId = option.value;
      const category = productCategories.find(c => c.id === categoryId);
      return category!;
    });
    
    setFormData(prev => ({
      ...prev,
      categories: selectedCategories
    }));
  };

  // Handle adding a feature
  const handleAddFeature = () => {
    if (!featuresInput.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, featuresInput.trim()]
    }));
    setFeaturesInput("");
  };

  // Handle removing a feature
  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const newImages: ProductImage[] = [];
    
    files.forEach(file => {
      // Create a local URL for the image preview
      const imageUrl = URL.createObjectURL(file);
      
      // Add the new image to the array
      newImages.push({
        id: generateUniqueId(),
        src: imageUrl,
        alt: file.name.split('.')[0] || "Product image",
        isPrimary: formData.images.length === 0 && newImages.length === 0
      });
    });
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  // Handle removing an image
  const handleRemoveImage = (imageId: string) => {
    setFormData(prev => {
      const updatedImages = prev.images.filter(img => img.id !== imageId);
      
      // If we removed the primary image, make the first remaining image primary
      if (!updatedImages.some(img => img.isPrimary) && updatedImages.length > 0) {
        updatedImages[0].isPrimary = true;
      }
      
      return {
        ...prev,
        images: updatedImages
      };
    });
  };

  // Handle setting an image as primary
  const handleSetPrimaryImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map(img => ({
        ...img,
        isPrimary: img.id === imageId
      }))
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) {
      newErrors.title = t('admin.products.validation.titleRequired');
    }
    
    if (!formData.slug) {
      newErrors.slug = t('admin.products.validation.slugRequired');
    }
    
    if (formData.price <= 0) {
      newErrors.price = t('admin.products.validation.pricePositive');
    }
    
    if (formData.compareAtPrice < 0) {
      newErrors.compareAtPrice = t('admin.products.validation.comparePriceNonNegative');
    }
    
    if (formData.images.length === 0) {
      newErrors.images = t('admin.products.validation.imageRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get existing products from localStorage
      const existingProductsJSON = localStorage.getItem("adminProducts");
      let existingProducts: Product[] = existingProductsJSON ? JSON.parse(existingProductsJSON) : [];
      
      if (mode === "add") {
        // Create new product with unique ID
        const newProduct: Product = {
          id: generateUniqueId(),
          ...formData
        };
        
        // Add to products array
        existingProducts = [...existingProducts, newProduct];
      } else if (mode === "edit" && product) {
        // Update existing product
        existingProducts = existingProducts.map(p => 
          p.id === product.id ? { ...formData, id: product.id } : p
        );
      }
      
      // Save to localStorage
      localStorage.setItem("adminProducts", JSON.stringify(existingProducts));
      
      // Redirect back to products list
      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setErrors({
        form: t('admin.products.errorSaving')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Product Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('admin.products.basicInfo')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Title */}
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('admin.products.productTitle')} *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md ${
                errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
              } shadow-sm dark:bg-gray-700`}
              placeholder={t('admin.products.titlePlaceholder')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Product Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('admin.products.productSlug')} *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md ${
                errors.slug ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
              } shadow-sm dark:bg-gray-700`}
              placeholder={t('admin.products.slugPlaceholder')}
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
            )}
          </div>

          {/* SKU */}
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('admin.products.sku')}
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
              placeholder={t('admin.products.skuPlaceholder')}
            />
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('admin.products.description')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
            placeholder={t('admin.products.descriptionPlaceholder')}
          ></textarea>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('admin.products.pricing')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Regular Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('admin.products.price')} *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{formData.currency}</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`pl-7 block w-full rounded-md ${
                  errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm dark:bg-gray-700`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {/* Compare-at Price */}
          <div>
            <label htmlFor="compareAtPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('admin.products.compareAtPrice')}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{formData.currency}</span>
              </div>
              <input
                type="number"
                id="compareAtPrice"
                name="compareAtPrice"
                value={formData.compareAtPrice || ""}
                onChange={handleChange}
                className={`pl-7 block w-full rounded-md ${
                  errors.compareAtPrice ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm dark:bg-gray-700`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.compareAtPrice && (
              <p className="mt-1 text-sm text-red-600">{errors.compareAtPrice}</p>
            )}
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('admin.products.currency')}
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
            >
              <option value="€">EUR (€)</option>
              <option value="$">USD ($)</option>
              <option value="£">GBP (£)</option>
              <option value="ALL">ALL</option>
            </select>
          </div>
        </div>

        {/* In Stock Checkbox */}
        <div className="mt-4 flex items-center">
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => handleChange(e)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
            {t('admin.products.inStockLabel')}
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('admin.products.categories')}</h2>
        
        <div>
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('admin.products.selectCategories')}
          </label>
          <select
            id="categories"
            name="categories"
            multiple
            value={formData.categories.map(c => c.id)}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
            size={4}
          >
            {productCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('admin.products.categoriesHelp')}
          </p>
        </div>
      </div>

      {/* Product Features */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('admin.products.features')}</h2>
        
        <div>
          <div className="flex">
            <input
              type="text"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              className="flex-grow rounded-l-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700"
              placeholder={t('admin.products.featurePlaceholder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiPlus />
            </button>
          </div>
          
          <ul className="mt-4 space-y-2">
            {formData.features.map((feature, index) => (
              <li key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <FiX />
                </button>
              </li>
            ))}
            {formData.features.length === 0 && (
              <li className="py-2 px-3 text-gray-500 dark:text-gray-400 italic">
                {t('admin.products.noFeatures')}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('admin.products.images')} *</h2>
        
        <div>
          {/* Image upload button */}
          <div className="flex items-center justify-center w-full">
            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiImage className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{t('admin.products.clickToUpload')}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('admin.products.imageTypes')}
                </p>
              </div>
              <input 
                id="image-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images}</p>
          )}
          
          {/* Image preview */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((image) => (
              <div key={image.id} className="relative group">
                <div className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 ${
                  image.isPrimary ? 'ring-2 ring-indigo-500' : ''
                }`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded">
                      {t('admin.products.primary')}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    {!image.isPrimary && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(image.id)}
                        className="p-1 bg-white text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition-colors"
                        title={t('admin.products.setPrimary')}
                      >
                        <FiSave size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="p-1 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      title={t('admin.products.removeImage')}
                    >
                      <FiTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('admin.cancel')}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('admin.saving')}
            </>
          ) : (
            <>
              <FiSave className="mr-2 -ml-1" />
              {mode === "add" ? t('admin.products.addProduct') : t('admin.products.updateProduct')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
