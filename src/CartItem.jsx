import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart, selectCartItems, selectCartTotal, selectCartError } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const error = useSelector(selectCartError);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {cart.length > 0 ? (
        <>
          <h2 style={{ color: 'black' }}> Total Cart Amount: ${total.toFixed(2)}</h2>
          
          <div>
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Price: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="total_cart_amount">
            Total Cart Amount: ${total.toFixed(2)}
          </div>
          <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
            <br />
            <button className="get-started-button1">Checkout</button>
            <button className="cart-item-delete clear-cart" onClick={handleClearCart}>Clear Cart</button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default CartItem;


