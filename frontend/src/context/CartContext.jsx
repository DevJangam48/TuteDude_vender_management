import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        // If item already exists in the cart, update its quantity
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Otherwise, add the new product as a new item in the cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.groupPrice * item.quantity,
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
