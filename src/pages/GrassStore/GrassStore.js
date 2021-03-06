import { Route } from 'react-router-dom';

import './GrassStore.scss';

import useSetupStore from 'hooks/useSetupStore';

import Header from 'components/Header';
import StoreHome from '../StoreHome';
import ShoppingCart from '../ShoppingCart';
import PokemonDetails from '../PokemonDetails';

const STORE_CART_KEY = process.env.REACT_APP_GRASS_STORE_CART_KEY;

function GrassStore() {
  const {
    path,
    searchInputValue,
    filteredPokemon,
    status,
    itemsOnCart,
    handleSearch,
    handleSearchInputChange,
    handleAddPokemonToCart,
    handleCartClick
  } = useSetupStore('grass', STORE_CART_KEY);

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
        {(status === 'succeeded' && (
          <StoreHome
            pokemon={filteredPokemon}
            onAddPokemonToCart={handleAddPokemonToCart}
            path={path}
          />
        )) || (
          <p className="l-grid" style={{ marginTop: '2rem' }}>
            Carregando...
          </p>
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
        <PokemonDetails storeCartKey={STORE_CART_KEY} checkoutBtnClass="is-success" />
      </Route>
    </section>
  );
}

export default GrassStore;
