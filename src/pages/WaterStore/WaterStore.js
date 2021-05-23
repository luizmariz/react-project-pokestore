import { Route } from 'react-router-dom';

import './WaterStore.scss';

import useSetupStore from 'hooks/useSetupStore';

import Header from 'components/Header';
import StoreHome from '../StoreHome';
import ShoppingCart from '../ShoppingCart';
import PokemonDetails from '../PokemonDetails';

const STORE_CART_KEY = process.env.REACT_APP_WATER_STORE_CART_KEY;

function WaterStore() {
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
  } = useSetupStore('water', STORE_CART_KEY);

  return (
    <section className="c-water-store">
      <Header
        storeName="ÁGUA STORE"
        storePath="/water-store"
        searchInputPlaceholder="Busque aqui o seu tipo planta"
        headerClass="c-water-store__header"
        searchBtnClass="is-primary"
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
          pokemonBitmapClass="nes-squirtle"
          checkoutBtnClass="is-primary"
        />
      </Route>
      <Route exact path={`${path}/pokemon/:pokemonId`}>
        <PokemonDetails storeCartKey={STORE_CART_KEY} checkoutBtnClass="is-primary" />
      </Route>
    </section>
  );
}

export default WaterStore;
