import { configureStore } from '@reduxjs/toolkit';

import { getPersistedCart, persistCart } from '../utils/helpers';

import logger from './middlewares/logger';

import pokemonReducer from './features/pokemon/pokemonSlice';
import cartReducer from './features/cart/cartSlice';

const reducer = {
  pokemon: pokemonReducer,
  cart: cartReducer
};

const config = {
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
};

const persistedCart = getPersistedCart();

if (persistedCart) {
  config.preloadedState = {
    cart: persistedCart
  };
}

const store = configureStore(config);

store.subscribe(() => {
  const cartState = store.getState().cart;
  persistCart(cartState);
});

export default store;
