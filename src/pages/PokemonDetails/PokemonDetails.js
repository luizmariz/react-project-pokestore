import { useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import { useParams } from 'react-router-dom';

import pokemonService from 'services/pokemonService';

function PokemonDetails() {
  const { pokemonId } = useParams();
  const { status, entities: pokemon } = useFetch(pokemonService.getPokemonById, pokemonId);

  useEffect(() => {
    console.log(status, pokemon);
  }, [status]);

  return <div>Pokemon aqui</div>;
}

export default PokemonDetails;
