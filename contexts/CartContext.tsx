"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "@/types/product";

type CartItem = {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
        }
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);
  
  // Calculate total number of items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Add item to cart
  const addItem = (product: Product, quantity: number, variant?: ProductVariant) => {
    setItems((prevItems) => {
      // Check if product (and variant) already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && 
               (!variant || !item.variant || item.variant.id === variant.id)
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { product, quantity, variant }];
      }
    });
    
    // Open cart drawer when adding items
    setIsCartOpen(true);
  };
  
  // Remove item from cart
  const removeItem = (productId: string, variantId?: string) => {
    setItems((prevItems) => 
      prevItems.filter(
        item => !(item.product.id === productId && 
               (!variantId || !item.variant || item.variant.id === variantId))
      )
    );
  };
  
  // Update quantity of an item
  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    setItems((prevItems) => 
      prevItems.map(item => {
        if (
          item.product.id === productId && 
          (!variantId || !item.variant || item.variant.id === variantId)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    isCartOpen,
    setIsCartOpen
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
