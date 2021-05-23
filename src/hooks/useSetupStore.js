import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { simplePokemonSearchByName } from 'utils/helpers';

import {
  fetchPokemonByType,
  selectAllPokemon,
  removeAllPokemon
} from 'redux/features/pokemon/pokemonSlice';

import { addItemToCart, selectNumberOfItemsByStore } from 'redux/features/cart/cartSlice';

import usePrevious from './usePrevious';

function useSetupStore(pokemonType, storeCartKey) {
  const prevPokemonType = usePrevious(pokemonType);

  const history = useHistory();
  const { path } = useRouteMatch();

  const [searchInputValue, setSearchInputValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const dispatch = useDispatch();

  const pokemon = useSelector(selectAllPokemon);
  const status = useSelector((state) => state.pokemon.status);

  const itemsOnCart = useSelector(selectNumberOfItemsByStore(storeCartKey));

  useEffect(() => {
    if (prevPokemonType !== pokemonType) {
      dispatch(removeAllPokemon());
    }

    if (status === 'idle') {
      dispatch(fetchPokemonByType(pokemonType));
    }

    if (pokemon) {
      setFilteredPokemon(pokemon);
    }
  }, [pokemonType, status]);

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
    history.push(`${path}`);
  };

  const handleAddPokemonToCart = (p) => {
    dispatch(addItemToCart({ item: p, store: storeCartKey }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    history.push(`${path}/shopping-cart`);
  };

  return {
    path,
    searchInputValue,
    filteredPokemon,
    status,
    itemsOnCart,
    handleSearch,
    handleSearchInputChange,
    handleAddPokemonToCart,
    handleCartClick
  };
}

export default useSetupStore;
