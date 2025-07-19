"use client";

import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";

interface CartButtonProps {
  className?: string;
}

export default function CartButton({ className = "" }: CartButtonProps) {
  const { itemCount, setIsCartOpen } = useCart();
  
  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className={`relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label="Open shopping cart"
    >
      <FaShoppingBag size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
