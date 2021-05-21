import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import pokemonService from 'services/pokemonService';

const initialState = {
  status: 'idle',
  error: null,
  entities: null
};

export const fetchPokemonByType = createAsyncThunk('pokemon/fetchPokemonByType', async (type) => {
  const res = await pokemonService.getAllPokemonByType(type);
  return res;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
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

export default pokemonSlice.reducer;
