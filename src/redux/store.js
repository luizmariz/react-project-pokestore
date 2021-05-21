import { configureStore } from '@reduxjs/toolkit';

import logger from './middlewares/logger';

import pokemonReducer from './features/pokemon/pokemonSlice';

const reducer = {
  pokemon: pokemonReducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
