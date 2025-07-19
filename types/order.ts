import { Product } from "./product";

export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "completed" 
  | "shipped" 
  | "delivered" 
  | "cancelled" 
  | "refunded";

export type PaymentMethod = 
  | "card" 
  | "paypal" 
  | "bank_transfer" 
  | "cash_on_delivery";

export type PaymentStatus = 
  | "pending" 
  | "processing" 
  | "completed" 
  | "failed" 
  | "refunded";

export interface OrderItem {
  id: string;
  productId: string;
  productSnapshot: {
    title: string;
    price: number;
    currency: string;
    image: string;
    slug: string;
  };
  quantity: number;
  price: number; // Price at time of order
}

export interface CustomerInfo {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  shippingMethod: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}
