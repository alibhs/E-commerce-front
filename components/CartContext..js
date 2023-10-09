import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({children}){
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  const [quantity,setQuantity] = useState(() => {
    if (ls && ls.getItem("quantity")) {
      return parseInt(ls.getItem("quantity"));
    } else {
      return 0;
    }
  });

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);


  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId) {
    const index = cartProducts.findIndex((product) => product.productId === productId);
    if (index === -1) {
      setCartProducts([...cartProducts, { productId: productId, quantity: 1 }]);
    } else {
      const newCart = [...cartProducts];
      newCart[index].quantity += 1;
      setCartProducts(newCart);
    }
    setQuantity(prev => prev + 1 );
  }

  function removeProduct(productId){
    const index = cartProducts.findIndex((product) => product.productId === productId);
    if (index !== -1) {
      const newCart = [...cartProducts];
      newCart[index].quantity -= 1;
      if (newCart[index].quantity === 0) {
        newCart.splice(index, 1);
        ls?.clear();
      }
      setCartProducts(newCart);
      setQuantity(prev => prev - 1 );
    }
  }

  function clearCart() {
    setCartProducts([]);
    setQuantity(0);
    ls?.removeItem("cart");
  }

  return(
    <CartContext.Provider value={{quantity,cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  )
}