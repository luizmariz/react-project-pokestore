import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  total: {},
  numberOfItems: {}
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        cartAdapter.addOne(state, action);

        if (!state.total[action.meta.store]) {
          state.total[action.meta.store] = 0;
        }

        if (!state.numberOfItems[action.meta.store]) {
          state.numberOfItems[action.meta.store] = 0;
        }

        state.total[action.meta.store] += action.payload.price;
        state.numberOfItems[action.meta.store] += 1;
      },
      prepare({ item, store }) {
        return {
          payload: item,
          meta: { store }
        };
      }
    },
    removeItemFromCart: {
      reducer(state, action) {
        cartAdapter.removeOne(state, action);
        state.total[action.meta.store] -= state.entities[action.payload.id];
        state.numberOfItems[action.meta.store] -= 1;
      },
      prepare({ id, store }) {
        return {
          payload: id,
          meta: { store }
        };
      }
    }
  }
});

export const selectNumberOfItemsByStore = (store) => (state) => state.cart.numberOfItems[store];
export const selectTotalByStore = (store) => (state) => state.cart.total[store];

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export const { selectAll: selectCartItem, selectById: selectCartItemById } =
  cartAdapter.getSelectors((state) => state.cart);

export default cartSlice.reducer;
