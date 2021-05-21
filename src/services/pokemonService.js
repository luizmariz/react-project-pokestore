import axios from 'axios';
import { mockPokemonPrice } from 'utils/helpers';

const endpoint = process.env.REACT_APP_POKEMON_API_ENDPOINT;

const pokemonService = {
  getAllPokemonByType: async (type) => {
    const res = await axios.get(`${endpoint}/type/${type}`);

    const promises = res.data.pokemon.map((pokemon) => axios.get(pokemon.pokemon.url));
    const pokemon = await Promise.all(promises);

    return mockPokemonPrice(pokemon.map((p) => p.data));
  }
};

export default pokemonService;
