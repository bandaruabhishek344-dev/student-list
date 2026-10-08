import { createContext, useContext, useMemo, useReducer } from "react";
import { cartReducer, initialState } from "./CartReducer";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    [state.cart]
  );

  const totalPrice = useMemo(
    () =>
      state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [state.cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        dispatch,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}