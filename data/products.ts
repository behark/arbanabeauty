import { Product, ProductCategory } from "@/types/product";

// Categories
export const productCategories: ProductCategory[] = [
  { id: "cat1", name: "Makeup", slug: "makeup" },
  { id: "cat2", name: "Skincare", slug: "skincare" },
  { id: "cat3", name: "Hair Products", slug: "hair-products" },
  { id: "cat4", name: "Beauty Tools", slug: "beauty-tools" },
  { id: "cat5", name: "Gift Sets", slug: "gift-sets" },
];

// Sample products data
export const products: Product[] = [
  {
    id: "prod1",
    title: "Luxury Foundation",
    slug: "luxury-foundation",
    description: "Our premium foundation offers perfect coverage with a natural finish that lasts all day. Suitable for all skin types, this foundation blends seamlessly for a flawless look. Available in various shades to match any skin tone.",
    shortDescription: "Long-lasting premium foundation with natural finish",
    price: 45,
    compareAtPrice: 55,
    currency: "EUR",
    images: [
      { id: "img1", src: "/images/products/foundation-1.jpg", alt: "Luxury Foundation", isPrimary: true },
      { id: "img2", src: "/images/products/foundation-2.jpg", alt: "Foundation Application" }
    ],
    categories: [{ id: "cat1", name: "Makeup", slug: "makeup" }],
    variants: [
      { id: "var1", name: "Light", price: 45, sku: "FDN-LGT", stockQuantity: 20, isDefault: true },
      { id: "var2", name: "Medium", price: 45, sku: "FDN-MDM", stockQuantity: 15 },
      { id: "var3", name: "Dark", price: 45, sku: "FDN-DRK", stockQuantity: 10 }
    ],
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 128,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-03-20T00:00:00Z"
  },
  {
    id: "prod2",
    title: "Hydrating Serum",
    slug: "hydrating-serum",
    description: "This powerful hydrating serum is formulated with hyaluronic acid and vitamins to deeply moisturize and rejuvenate your skin. Regular use helps reduce fine lines and improves skin elasticity.",
    shortDescription: "Powerful serum with hyaluronic acid and vitamins",
    price: 35,
    currency: "EUR",
    images: [
      { id: "img3", src: "/images/products/serum-1.jpg", alt: "Hydrating Serum", isPrimary: true },
      { id: "img4", src: "/images/products/serum-2.jpg", alt: "Serum Texture" }
    ],
    categories: [{ id: "cat2", name: "Skincare", slug: "skincare" }],
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 96,
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-04-15T00:00:00Z"
  },
  {
    id: "prod3",
    title: "Professional Makeup Brush Set",
    slug: "professional-makeup-brush-set",
    description: "Our professional-grade makeup brush set includes everything you need for a flawless application. With 12 essential brushes made from synthetic fibers, you'll achieve salon-quality results at home.",
    shortDescription: "12-piece professional makeup brush set",
    price: 75,
    compareAtPrice: 90,
    currency: "EUR",
    images: [
      { id: "img5", src: "/images/products/brushes-1.jpg", alt: "Professional Makeup Brush Set", isPrimary: true },
      { id: "img6", src: "/images/products/brushes-2.jpg", alt: "Makeup Brushes Detail" }
    ],
    categories: [{ id: "cat4", name: "Beauty Tools", slug: "beauty-tools" }],
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 85,
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-05-10T00:00:00Z"
  },
  {
    id: "prod4",
    title: "Exclusive Lipstick Collection",
    slug: "exclusive-lipstick-collection",
    description: "Our exclusive lipstick collection features five stunning shades, from classic reds to modern nudes. Each lipstick is enriched with moisturizing ingredients for comfortable, long-lasting wear.",
    shortDescription: "5-piece luxury lipstick collection",
    price: 65,
    currency: "EUR",
    images: [
      { id: "img7", src: "/images/products/lipstick-1.jpg", alt: "Exclusive Lipstick Collection", isPrimary: true },
      { id: "img8", src: "/images/products/lipstick-2.jpg", alt: "Lipstick Colors" }
    ],
    categories: [{ id: "cat1", name: "Makeup", slug: "makeup" }],
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 72,
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2023-04-25T00:00:00Z"
  },
  {
    id: "prod5",
    title: "Luxury Skincare Gift Set",
    slug: "luxury-skincare-gift-set",
    description: "Treat yourself or a loved one to our luxury skincare gift set. This comprehensive collection includes cleanser, toner, serum, moisturizer, and eye cream, all packaged in an elegant gift box.",
    shortDescription: "Complete 5-piece skincare routine",
    price: 120,
    compareAtPrice: 150,
    currency: "EUR",
    images: [
      { id: "img9", src: "/images/products/giftset-1.jpg", alt: "Luxury Skincare Gift Set", isPrimary: true },
      { id: "img10", src: "/images/products/giftset-2.jpg", alt: "Gift Set Contents" }
    ],
    categories: [
      { id: "cat2", name: "Skincare", slug: "skincare" },
      { id: "cat5", name: "Gift Sets", slug: "gift-sets" }
    ],
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 42,
    createdAt: "2023-05-01T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z"
  },
  {
    id: "prod6",
    title: "Hair Treatment Oil",
    slug: "hair-treatment-oil",
    description: "Our nourishing hair treatment oil is formulated with natural ingredients to repair damaged hair and add shine. Regular use helps prevent split ends and promotes healthy hair growth.",
    shortDescription: "Nourishing oil for damaged hair repair",
    price: 30,
    currency: "EUR",
    images: [
      { id: "img11", src: "/images/products/hairoil-1.jpg", alt: "Hair Treatment Oil", isPrimary: true },
      { id: "img12", src: "/images/products/hairoil-2.jpg", alt: "Hair Oil Application" }
    ],
    categories: [{ id: "cat3", name: "Hair Products", slug: "hair-products" }],
    featured: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 63,
    createdAt: "2023-02-28T00:00:00Z",
    updatedAt: "2023-05-20T00:00:00Z"
  },
  {
    id: "prod7",
    title: "Advanced Anti-Aging Cream",
    slug: "advanced-anti-aging-cream",
    description: "Our advanced anti-aging cream combines retinol, peptides, and antioxidants to reduce the appearance of fine lines and wrinkles. This powerful formula promotes collagen production for firmer, younger-looking skin.",
    shortDescription: "Premium anti-aging formula with retinol",
    price: 85,
    compareAtPrice: 100,
    currency: "EUR",
    images: [
      { id: "img13", src: "/images/products/cream-1.jpg", alt: "Advanced Anti-Aging Cream", isPrimary: true },
      { id: "img14", src: "/images/products/cream-2.jpg", alt: "Cream Texture" }
    ],
    categories: [{ id: "cat2", name: "Skincare", slug: "skincare" }],
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 104,
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z"
  },
  {
    id: "prod8",
    title: "Volumizing Mascara",
    slug: "volumizing-mascara",
    description: "Our volumizing mascara adds dramatic volume and length to your lashes without clumping. The specially designed brush separates and coats each lash for a stunning, long-lasting effect.",
    shortDescription: "Long-lasting mascara for dramatic volume",
    price: 25,
    currency: "EUR",
    images: [
      { id: "img15", src: "/images/products/mascara-1.jpg", alt: "Volumizing Mascara", isPrimary: true },
      { id: "img16", src: "/images/products/mascara-2.jpg", alt: "Mascara Application" }
    ],
    categories: [{ id: "cat1", name: "Makeup", slug: "makeup" }],
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 92,
    createdAt: "2023-01-25T00:00:00Z",
    updatedAt: "2023-04-10T00:00:00Z"
  }
];
