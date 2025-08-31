// contexts/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ProductFlavorVariant, ProductSizeVariant } from '@/types/product';

export interface CartItem {
  id: string; // Unique ID for cart item, e.g., "Nastar-Original-500 ml"
  productName: string;
  flavorName: string;
  quantity: number;
  image: string;
  hint: string;
  size: ProductSizeVariant;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productName: string, flavor: ProductFlavorVariant, size: ProductSizeVariant, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productName: string, flavor: ProductFlavorVariant, size: ProductSizeVariant, quantity: number = 1) => {
    setCartItems(prevItems => {
      const itemId = `${productName}-${flavor.name}-${size.size}`;
      const existingItem = prevItems.find(item => item.id === itemId);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { 
        id: itemId,
        productName,
        flavorName: flavor.name,
        image: flavor.image,
        hint: flavor.hint,
        size,
        quantity,
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => total + (item.size.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
