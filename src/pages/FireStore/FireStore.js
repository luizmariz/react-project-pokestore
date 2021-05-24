import { Route } from 'react-router-dom';

import './FireStore.scss';

import useSetupStore from 'hooks/useSetupStore';

import Header from 'components/Header';
import StoreHome from '../StoreHome';
import ShoppingCart from '../ShoppingCart';
import PokemonDetails from '../PokemonDetails';

const STORE_CART_KEY = process.env.REACT_APP_FIRE_STORE_CART_KEY;

function FireStore() {
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
  } = useSetupStore('fire', STORE_CART_KEY);

  return (
    <section className="c-fire-store">
      <Header
        storeName="FOGO STORE"
        storePath="/fire-store"
        searchInputPlaceholder="Busque aqui o seu tipo fogo"
        headerClass="c-fire-store__header"
        searchBtnClass="is-error"
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
          pokemonBitmapClass="nes-charmander"
          checkoutBtnClass="is-error"
        />
      </Route>
      <Route exact path={`${path}/pokemon/:pokemonId`}>
        <PokemonDetails storeCartKey={STORE_CART_KEY} checkoutBtnClass="is-error" />
      </Route>
    </section>
  );
}

export default FireStore;
