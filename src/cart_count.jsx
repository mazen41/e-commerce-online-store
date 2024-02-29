import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    // Initialize cartCount from localStorage or default to 0
    return parseInt(localStorage.getItem('cart_products_count')) || 0;
  });

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
    localStorage.setItem('cart_products_count', newCount.toString());
  };

  useEffect(() => {
    const storedCartCount = parseInt(localStorage.getItem('cart_products_count')) || 0;
    setCartCount(storedCartCount);
  }, []); // Run this effect only once during component mount

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
