import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const GRASS_STORE_KEY = process.env.REACT_APP_GRASS_STORE_CART_KEY;
const FIRE_STORE_KEY = process.env.REACT_APP_FIRE_STORE_CART_KEY;
const WATER_STORE_KEY = process.env.REACT_APP_WATER_STORE_CART_KEY;

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  totalByStore: {
    [GRASS_STORE_KEY]: 0,
    [FIRE_STORE_KEY]: 0,
    [WATER_STORE_KEY]: 0
  },
  numberOfItemsByStore: {
    [GRASS_STORE_KEY]: 0,
    [FIRE_STORE_KEY]: 0,
    [WATER_STORE_KEY]: 0
  },
  numberOfItemsByStoreById: {
    [GRASS_STORE_KEY]: {},
    [FIRE_STORE_KEY]: {},
    [WATER_STORE_KEY]: {}
  },
  idsByStore: {
    [GRASS_STORE_KEY]: [],
    [FIRE_STORE_KEY]: [],
    [WATER_STORE_KEY]: []
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        cartAdapter.addOne(state, action);

        if (state.numberOfItemsByStoreById[action.meta.store][action.payload.id]) {
          state.numberOfItemsByStoreById[action.meta.store][action.payload.id] += 1;
        } else {
          state.numberOfItemsByStoreById[action.meta.store][action.payload.id] = 1;
        }

        state.totalByStore[action.meta.store] += action.payload.price;
        state.numberOfItemsByStore[action.meta.store] += 1;

        if (!state.idsByStore[action.meta.store].includes(action.payload.id)) {
          state.idsByStore[action.meta.store].push(action.payload.id);
        }
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
        state.totalByStore[action.meta.store] -= state.entities[action.payload].price;
        state.numberOfItemsByStore[action.meta.store] -= 1;
        state.numberOfItemsByStoreById[action.meta.store][action.payload] -= 1;

        if (state.numberOfItemsByStoreById[action.meta.store][action.payload] === 0) {
          state.idsByStore[action.meta.store] = state.idsByStore[action.meta.store].filter(
            (id) => id !== action.payload
          );
          cartAdapter.removeOne(state, action);
        }
      },
      prepare({ id, store }) {
        return {
          payload: id,
          meta: { store }
        };
      }
    },
    checkoutCart: (state, action) => {
      const store = action.payload;

      state.totalByStore[store] = 0;
      state.numberOfItemsByStore[store] = 0;
      state.numberOfItemsByStoreById[store] = {};
      state.idsByStore[store] = [];
    },
    updateCartPrices: (state, action) => {
      const priceById = action.payload.reduce((acc, cur) => {
        acc[cur.id] = cur.changes.price;
        return acc;
      }, {});

      const newTotalByStore = {};

      Object.keys(state.totalByStore).forEach((store) => {
        const ids = state.idsByStore[store];
        const numberOfItemsById = state.numberOfItemsByStoreById[store];

        let total = 0;

        ids.forEach((id) => {
          const price = priceById[id] ? priceById[id] : state.entities[id].price;
          total += price * numberOfItemsById[id];
        });

        newTotalByStore[store] = total;
      });

      state.totalByStore = newTotalByStore;
      cartAdapter.updateMany(state, action);
    }
  }
});

export const selectNumberOfItemsByStoreById = (store) => (state) =>
  state.cart.numberOfItemsByStoreById[store];
export const selectNumberOfItemsByStore = (store) => (state) =>
  state.cart.numberOfItemsByStore[store];
export const selectTotalByStore = (store) => (state) => state.cart.totalByStore[store];
export const selectAllCartItemByStore = (store) => (state) =>
  state.cart.idsByStore[store].map((id) => state.cart.entities[id]);

export const { addItemToCart, removeItemFromCart, checkoutCart, updateCartPrices } =
  cartSlice.actions;

export default cartSlice.reducer;
