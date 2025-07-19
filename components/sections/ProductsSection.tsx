"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const featuredProducts = [
  {
    name: "Signature Lip Matte",
    category: "Lips",
    price: "$24.99",
    image: "/images/products/lip-matte.jpg",
    tags: ["Vegan", "Cruelty-Free"],
    link: "/shop/products/signature-lip-matte",
  },
  {
    name: "Volume Lash Collection",
    category: "Eyes",
    price: "$19.99",
    image: "/images/products/lashes.jpg",
    tags: ["Cruelty-Free"],
    link: "/shop/products/volume-lash-collection",
  },
  {
    name: "Precision Eyeliner",
    category: "Eyes",
    price: "$22.99",
    image: "/images/products/eyeliner.jpg",
    tags: ["Vegan", "Paraben-Free"],
    link: "/shop/products/precision-eyeliner",
  },
  {
    name: "Luminous Foundation",
    category: "Face",
    price: "$38.99",
    image: "/images/products/foundation.jpg",
    tags: ["Vegan", "Cruelty-Free", "Paraben-Free"],
    link: "/shop/products/luminous-foundation",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Arbana <span className="gradient-text">Beauty Products</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Discover our premium collection of vegan, cruelty-free, and paraben-free beauty essentials crafted with quality and performance in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-accent dark:bg-gray-800 aspect-square relative overflow-hidden">
                {/* Placeholder for product image */}
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  <span>{product.name}</span>
                </div>
                
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Link
                    href={product.link}
                    className="px-4 py-2 bg-white text-secondary text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    Quick View
                  </Link>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{product.category}</span>
                    <h3 className="font-bold">{product.name}</h3>
                  </div>
                  <span className="font-medium text-primary">{product.price}</span>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="px-8 py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors inline-block"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
