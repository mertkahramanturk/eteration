import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART
} from '../actions/cartAction';
import { addNotification } from '../notification';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      let newCartItems;
      if (itemIndex >= 0) {
        newCartItems = state.cartItems.map((item, index) => 
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        newCartItems = [...state.cartItems, newItem];
      }
      localStorage.setItem('cart', JSON.stringify(newCartItems));
       addNotification(action.notification, 'success');
      return { ...state, cartItems: newCartItems };
    }

    case REMOVE_FROM_CART: {
      const newCartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      addNotification(action.notification, 'success');
      return { ...state, cartItems: newCartItems };
    }

    case INCREASE_QUANTITY: {
      const newCartItems = state.cartItems.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      addNotification(action.notification, 'success');
      return { ...state, cartItems: newCartItems };
    }

    case DECREASE_QUANTITY: {
      const newCartItems = state.cartItems.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      addNotification(action.notification, 'success');
      return { ...state, cartItems: newCartItems };
    }
    case CLEAR_CART:
      addNotification(action.notification, 'success');
    return {
      ...state,
      cartItems: [],
    };
    default:
      return state;
  }
};

export default cartReducer;
