"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FiUpload, 
  FiTrash2, 
  FiEdit, 
  FiCopy, 
  FiDownload,
  FiImage,
  FiGrid,
  FiList
} from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadDate: string;
  usedIn: string[];
}

const ImageManager = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample images - in a real app, this would come from your image storage
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      name: 'hero-makeup-artist.jpg',
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80',
      size: '245 KB',
      uploadDate: '2024-01-15',
      usedIn: ['Hero Section'],
    },
    {
      id: '2',
      name: 'about-portrait.jpg',
      url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      size: '198 KB',
      uploadDate: '2024-01-14',
      usedIn: ['About Section'],
    },
    {
      id: '3',
      name: 'bridal-makeup.jpg',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      size: '312 KB',
      uploadDate: '2024-01-13',
      usedIn: ['Services - Bridal'],
    },
    {
      id: '4',
      name: 'academy-training.jpg',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      size: '278 KB',
      uploadDate: '2024-01-12',
      usedIn: ['Academy Section'],
    },
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    // Simulate upload process
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // In a real app, you would upload to Cloudinary, AWS S3, etc.
      const newImage: ImageItem = {
        id: Date.now().toString() + i,
        name: file.name,
        url: URL.createObjectURL(file), // Temporary URL for demo
        size: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        usedIn: [],
      };

      setImages(prev => [newImage, ...prev]);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Delete ${selectedImages.length} selected image(s)?`)) {
      setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  const replaceImageInSection = (imageUrl: string, section: string) => {
    // This would update the actual website content
    alert(`Replace image in ${section} with new image? This would update your live website.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Image Manager</h1>
            <p className="text-gray-600 mt-2">
              Upload, organize, and manage all your website images
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <FiUpload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Images'}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Actions Bar */}
        {selectedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">
                {selectedImages.length} image(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedImages([])}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Images Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
                  selectedImages.includes(image.id)
                    ? 'border-primary shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleImageSelect(image.id)}
              >
                <div className="relative aspect-square rounded-t-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                  {selectedImages.includes(image.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-2">{image.name}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Size: {image.size}</p>
                    <p>Uploaded: {image.uploadDate}</p>
                    {image.usedIn.length > 0 && (
                      <p className="text-green-600">Used in: {image.usedIn.join(', ')}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyImageUrl(image.url);
                      }}
                      className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      <FiCopy className="w-4 h-4 mr-1" />
                      Copy URL
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image.url, '_blank');
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedImages.length === images.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedImages(images.map(img => img.id));
                          } else {
                            setSelectedImages([]);
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Used In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {images.map((image) => (
                    <tr key={image.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(image.id)}
                          onChange={() => handleImageSelect(image.id)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                          <Image
                            src={image.url}
                            alt={image.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{image.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{image.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {image.usedIn.length > 0 ? image.usedIn.join(', ') : 'Not used'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{image.uploadDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => copyImageUrl(image.url)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy URL"
                          >
                            <FiCopy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.open(image.url, '_blank')}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Download"
                          >
                            <FiDownload className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Instructions */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FiImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded yet</h3>
            <p className="text-gray-500 mb-6">
              Upload your first images to get started managing your website content
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              <FiUpload className="w-4 h-4 mr-2" />
              Upload Images
            </button>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ImageManager;
