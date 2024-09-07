import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/actions/cartAction';

const Quantity = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(productId, 'Item quantity increased successfully')); 
  };

  const handleDecrease = (event) => {
    if (quantity > 1) {
      event.stopPropagation()
      dispatch(decreaseQuantity(productId, 'Item quantity reduced successfully')); 
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(productId, 'Item removed successfully')); 
  };

  return (
    <div className="quantity-controls d-flex align-items-center">
      {quantity > 1 ? (
          <i className='fas fa-minus text-primary px-2 py-2' onClick={(event) => handleDecrease(event)}/>
      ) : (
          <i className='fas fa-trash text-red px-2 py-2' onClick={handleRemove}/>
      )}
  
      <span className="mx-2">{quantity}</span>
        <i className='fas fa-plus text-primary px-2 py-2' onClick={handleIncrease}/>
    </div>
  );
};

export default Quantity;
