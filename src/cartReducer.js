import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions";

const initialState = { cartItems: [], total: 0 };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CALCULATE_TOTAL:
      return {
        ...state,
        total: state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
