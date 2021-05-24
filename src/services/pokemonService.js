import axios from 'axios';
import { mockPokemonPrice } from 'utils/helpers';

const endpoint =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_POKEMEN_API_ENDPOINT_PROD
    : process.env.REACT_APP_POKEMON_API_ENDPOINT;

const pokemonService = {
  getAllPokemonByType: async (type) => {
    const res = await axios.get(`${endpoint}/type/${type}`);

    const promises = res.data.pokemon.map((pokemon) => axios.get(pokemon.pokemon.url));
    const pokemon = await Promise.all(promises);

    return mockPokemonPrice(pokemon.map((p) => p.data));
  },
  getPokemonById: async (id) => {
    const res = await axios.get(`${endpoint}/pokemon/${id}`);
    return res.data;
  }
};

export default pokemonService;
