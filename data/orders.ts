import { Order } from "@/types/order";
import { generateUniqueId } from "@/utils/helpers";

// Sample order data
export const orders: Order[] = [
  {
    id: "ord_" + generateUniqueId(),
    orderNumber: "ARB-1001",
    customerInfo: {
      firstName: "Ana",
      lastName: "Krasniqi",
      email: "ana.krasniqi@example.com",
      phone: "+38344123456",
      address: {
        line1: "Rr. Adem Jashari, Nr. 15",
        city: "Prishtina",
        postalCode: "10000",
        country: "Kosovo"
      }
    },
    items: [
      {
        id: "item_" + generateUniqueId(),
        productId: "prod_1",
        productSnapshot: {
          title: "Signature Lip Matte",
          price: 18.99,
          currency: "€",
          image: "/images/products/lipstick.jpg",
          slug: "signature-lip-matte"
        },
        quantity: 2,
        price: 18.99
      },
      {
        id: "item_" + generateUniqueId(),
        productId: "prod_3",
        productSnapshot: {
          title: "Precision Eyeliner",
          price: 15.99,
          currency: "€",
          image: "/images/products/eyeliner.jpg",
          slug: "precision-eyeliner"
        },
        quantity: 1,
        price: 15.99
      }
    ],
    subtotal: 53.97,
    tax: 5.40,
    shipping: 5.00,
    discount: 0,
    total: 64.37,
    currency: "€",
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "completed",
    paymentId: "pi_3OSu7Y",
    shippingMethod: "Standard Delivery",
    createdAt: "2025-07-10T14:30:00Z",
    updatedAt: "2025-07-12T09:15:00Z"
  },
  {
    id: "ord_" + generateUniqueId(),
    orderNumber: "ARB-1002",
    customerInfo: {
      firstName: "Blerina",
      lastName: "Hoxha",
      email: "blerina.h@example.com",
      phone: "+38345789012",
      address: {
        line1: "Rr. Fehmi Agani, Bl. 3, Ap. 7",
        city: "Mitrovica",
        postalCode: "40000",
        country: "Kosovo"
      }
    },
    items: [
      {
        id: "item_" + generateUniqueId(),
        productId: "prod_4",
        productSnapshot: {
          title: "Luminous Foundation",
          price: 29.99,
          currency: "€",
          image: "/images/products/foundation.jpg",
          slug: "luminous-foundation"
        },
        quantity: 1,
        price: 29.99
      }
    ],
    subtotal: 29.99,
    tax: 3.00,
    shipping: 5.00,
    discount: 0,
    total: 37.99,
    currency: "€",
    status: "shipped",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    paymentId: "9HK87321X",
    shippingMethod: "Express Delivery",
    createdAt: "2025-07-15T10:20:00Z",
    updatedAt: "2025-07-15T14:45:00Z"
  },
  {
    id: "ord_" + generateUniqueId(),
    orderNumber: "ARB-1003",
    customerInfo: {
      firstName: "Ariana",
      lastName: "Gashi",
      email: "ariana@example.com",
      phone: "+38349456789",
      address: {
        line1: "Rr. Garibaldi, Nr. 23",
        line2: "Hyrja B, Kati 3",
        city: "Prishtina",
        postalCode: "10000",
        country: "Kosovo"
      }
    },
    items: [
      {
        id: "item_" + generateUniqueId(),
        productId: "prod_2",
        productSnapshot: {
          title: "Volume Lash Collection",
          price: 24.99,
          currency: "€",
          image: "/images/products/lashes.jpg",
          slug: "volume-lash-collection"
        },
        quantity: 1,
        price: 24.99
      },
      {
        id: "item_" + generateUniqueId(),
        productId: "prod_5",
        productSnapshot: {
          title: "Glowing Highlighter",
          price: 19.99,
          currency: "€",
          image: "/images/products/highlighter.jpg",
          slug: "glowing-highlighter"
        },
        quantity: 1,
        price: 19.99
      },
      {
        id: "item_" + generateUniqueId(),
        productId: "prod_6",
        productSnapshot: {
          title: "Pro Makeup Brush Set",
          price: 49.99,
          currency: "€",
          image: "/images/products/brushset.jpg",
          slug: "pro-makeup-brush-set"
        },
        quantity: 1,
        price: 49.99
      }
    ],
    subtotal: 94.97,
    tax: 9.50,
    shipping: 0, // Free shipping
    discount: 10.00, // Discount applied
    total: 94.47,
    currency: "€",
    status: "pending",
    paymentMethod: "bank_transfer",
    paymentStatus: "pending",
    shippingMethod: "Standard Delivery",
    createdAt: "2025-07-18T16:45:00Z",
    updatedAt: "2025-07-18T16:45:00Z"
  }
];
