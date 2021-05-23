import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import pokemonService from 'services/pokemonService';

import { updateCartPrices } from '../cart/cartSlice';

const initialState = {
  status: 'idle',
  error: null,
  entities: {}
};

export const fetchPokemonByType = createAsyncThunk(
  'pokemon/fetchPokemonByType',
  async (type, thunkAPI) => {
    const res = await pokemonService.getAllPokemonByType(type);

    // Precisamos atualizar os preços do carrinho na localStorage
    const { cart } = thunkAPI.getState();
    const entitiesToUpdate = res.filter((p) => cart.ids.includes(p.id));

    thunkAPI.dispatch(
      updateCartPrices(entitiesToUpdate.map((e) => ({ id: e.id, changes: { price: e.price } })))
    );

    return res;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    removeAll: (state) => {
      state.entities = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonByType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const newEntities = {};

        action.payload.forEach((pokemon) => {
          newEntities[pokemon.id] = pokemon;
        });

        state.entities = newEntities;
      })
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectAllPokemon = (state) =>
  state.pokemon.entities ? Object.values(state.pokemon.entities) : [];

export const selectPriceByPokemonId = (id) => (state) =>
  state.pokemon.entities[id] ? state.pokemon.entities[id].price : null;

export const { removeAll: removeAllPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
