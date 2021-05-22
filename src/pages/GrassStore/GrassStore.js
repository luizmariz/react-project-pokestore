import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GrassStore.scss';

import { fetchPokemonByType, selectAllPokemon } from 'redux/features/pokemon/pokemonSlice';
import { addItemToCart, selectNumberOfItemsByStore } from 'redux/features/cart/cartSlice';
import { simplePokemonSearchByName } from 'utils/helpers';

import Header from 'components/Header';
import PokemonList from 'components/PokemonList';
import Pokemon from 'components/Pokemon';

const STORE_CART_KEY = 'grass-store';

function GrassStore() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const dispatch = useDispatch();

  const pokemon = useSelector(selectAllPokemon);
  const pokemonStatus = useSelector((state) => state.pokemon.status);

  const itemsOnCart = useSelector(selectNumberOfItemsByStore(STORE_CART_KEY));

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

  const handleAddPokemonToCart = (p) => {
    dispatch(addItemToCart({ item: p, store: STORE_CART_KEY }));
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
        itemsCartCounter={itemsOnCart}
      />
      {pokemonStatus === 'succeeded' && (
        <div className="l-grid l-grid--tab l-grid--lg c-grass-store__body">
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-12--lg">
            <PokemonList>
              {filteredPokemon.map((p) => (
                <Pokemon
                  key={`pokemon-${p.id}`}
                  id={p.id}
                  name={p.name}
                  spriteUrl={p.sprites.front_default}
                  price={p.price}
                  onAddToCart={handleAddPokemonToCart}
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
