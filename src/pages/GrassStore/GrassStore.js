import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GrassStore.scss';

import { fetchPokemonByType, selectAllPokemon } from 'redux/features/pokemon/pokemonSlice';
import { simplePokemonSearchByName } from 'utils/helpers';

import Header from 'components/Header';
import PokemonList from 'components/PokemonList';
import Pokemon from 'components/Pokemon';

function GrassStore() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const dispatch = useDispatch();
  const pokemon = useSelector(selectAllPokemon);
  const pokemonStatus = useSelector((state) => state.pokemon.status);

  useEffect(() => {
    if (pokemonStatus === 'idle') {
      dispatch(fetchPokemonByType('grass'));
    }

    if (pokemon) {
      setFilteredPokemon(pokemon);
    }
  }, [pokemonStatus, dispatch]);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchInputValue(value);

    if (value === '') {
      setFilteredPokemon(pokemon);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredPokemon(simplePokemonSearchByName(pokemon, searchInputValue));
  };

  return (
    <section className="c-grass-store">
      <Header
        storeName="PLANTA STORE"
        storePath="/grass-store"
        searchInputPlaceholder="Busque aqui o seu tipo planta"
        searchInputValue={searchInputValue}
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
        headerClass="c-grass-store__header"
        searchBtnClass="is-success"
      />
      {pokemonStatus === 'succeeded' && (
        <div className="l-grid l-grid--tab l-grid--lg c-grass-store__body">
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-12--lg">
            <PokemonList>
              {filteredPokemon.map((p) => (
                <Pokemon
                  key={`pokemon-${p.id}`}
                  name={p.name}
                  spriteUrl={p.sprites.front_default}
                  price={p.price}
                />
              ))}
            </PokemonList>
          </div>
        </div>
      )}
    </section>
  );
}

export default GrassStore;
