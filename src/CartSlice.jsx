import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      try {
        const existingItem = state.items.find(item => item.name === action.payload.name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        // Recalculate total
        state.total = state.items.reduce((total, item) => {
          const cost = parseFloat(item.cost.replace('$', ''));
          return total + (cost * item.quantity);
        }, 0);
      } catch (error) {
        state.error = 'Error adding item to cart';
      }
    },
    removeItem: (state, action) => {
      try {
        state.items = state.items.filter(item => item.name !== action.payload.name);
        // Recalculate total
        state.total = state.items.reduce((total, item) => {
          const cost = parseFloat(item.cost.replace('$', ''));
          return total + (cost * item.quantity);
        }, 0);
      } catch (error) {
        state.error = 'Error removing item from cart';
      }
    },
    updateQuantity: (state, action) => {
      try {
        const item = state.items.find(item => item.name === action.payload.name);
        if (item) {
          item.quantity = action.payload.quantity;
          if (item.quantity <= 0) {
            state.items = state.items.filter(i => i.name !== action.payload.name);
          }
          // Recalculate total
          state.total = state.items.reduce((total, item) => {
            const cost = parseFloat(item.cost.replace('$', ''));
            return total + (cost * item.quantity);
          }, 0);
        }
      } catch (error) {
        state.error = 'Error updating item quantity';
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  setError, 
  clearError 
} = CartSlice.actions;

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state => state.cart.total;
export const selectCartItemCount = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartError = state => state.cart.error;

export default CartSlice.reducer;
