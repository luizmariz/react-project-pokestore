import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import './GrassStore.scss';

import { fetchPokemonByType, selectAllPokemon } from 'redux/features/pokemon/pokemonSlice';
import { addItemToCart, selectNumberOfItemsByStore } from 'redux/features/cart/cartSlice';
import { simplePokemonSearchByName } from 'utils/helpers';

import Header from 'components/Header';
import StoreHome from '../StoreHome';
import ShoppingCart from '../ShoppingCart';
import PokemonDetails from '../PokemonDetails';

const STORE_CART_KEY = process.env.REACT_APP_GRASS_STORE_CART_KEY;

function GrassStore() {
  const history = useHistory();
  const { path, url } = useRouteMatch();

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
    history.push(`${url}`);
  };

  const handleAddPokemonToCart = (p) => {
    dispatch(addItemToCart({ item: p, store: STORE_CART_KEY }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    history.push(`${url}/shopping-cart`);
  };

  return (
    <section className="c-grass-store">
      <Header
        storeName="PLANTA STORE"
        storePath="/grass-store"
        searchInputPlaceholder="Busque aqui o seu tipo planta"
        headerClass="c-grass-store__header"
        searchBtnClass="is-success"
        searchInputValue={searchInputValue}
        itemsCartCounter={itemsOnCart}
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
        onCartClick={handleCartClick}
      />

      <Route exact path={`${path}`}>
        {pokemonStatus === 'succeeded' && (
          <StoreHome
            pokemon={filteredPokemon}
            onAddPokemonToCart={handleAddPokemonToCart}
            path={path}
          />
        )}
      </Route>
      <Route exact path={`${path}/shopping-cart`}>
        <ShoppingCart
          storeCartKey={STORE_CART_KEY}
          pokemonBitmapClass="nes-bulbasaur"
          checkoutBtnClass="is-success"
        />
      </Route>
      <Route exact path={`${path}/pokemon/:pokemonId`}>
        <PokemonDetails />
      </Route>
    </section>
  );
}

export default GrassStore;
