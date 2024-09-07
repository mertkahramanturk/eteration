export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (item, notification) => {
  return {
    type: ADD_TO_CART,
    payload: item,
    notification: notification
  };
};

export const removeFromCart = (itemId, notification) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
    notification: notification
  };
};

export const increaseQuantity = (itemId, notification) => {
  return {
    type: INCREASE_QUANTITY,
    payload: itemId,
    notification: notification
  };
};

export const decreaseQuantity = (itemId, notification) => {
  return {
    type: DECREASE_QUANTITY,
    payload: itemId,
    notification: notification
  };
};

export const clearCart = (notification) => {
  return {
    type: CLEAR_CART,
    notification: notification
  };
};
