import { configureStore } from '@reduxjs/toolkit';

import logger from './middlewares/logger';

import pokemonReducer from './features/pokemon/pokemonSlice';
import cartReducer from './features/cart/cartSlice';

const reducer = {
  pokemon: pokemonReducer,
  cart: cartReducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
