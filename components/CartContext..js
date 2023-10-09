import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({children}){
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);

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
    }
  }

  function clearCart() {
    setCartProducts([]);
    ls?.removeItem("cart");
  }

let totalQuantity = 0;

for (let i = 0; i < cartProducts.length; i++) {
  totalQuantity += cartProducts[i].quantity;
}

  return(
    <CartContext.Provider value={{totalQuantity,cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  )
}