import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './ShoppingCart.scss';

import {
  selectAllCartItemByStore,
  selectNumberOfItemsByStoreById,
  selectTotalByStore,
  removeItemFromCart,
  checkoutCart
} from 'redux/features/cart/cartSlice';

import CartList from 'components/CartList';
import CartItem from 'components/CartItem';

function ShoppingCart({ storeCartKey, pokemonBitmapClass, checkoutBtnClass }) {
  const checkoutDialog = useRef();

  const dispatch = useDispatch();

  const pokemonOnCart = useSelector(selectAllCartItemByStore(storeCartKey));
  const numberOfPokemonById = useSelector(selectNumberOfItemsByStoreById(storeCartKey));
  const total = useSelector(selectTotalByStore(storeCartKey));

  const handleRemovePokemonFromCart = (id) => {
    console.log(storeCartKey);
    dispatch(removeItemFromCart({ id, store: storeCartKey }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    dispatch(checkoutCart(storeCartKey));
    checkoutDialog.current.showModal();
  };

  const handleCloseDialog = (e) => {
    e.preventDefault();
    checkoutDialog.current.close();
  };

  return (
    <>
      <section className="l-grid l-grid--tab l-grid--lg c-shopping-cart">
        <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-4--lg">
          <div className="c-shopping-cart__bitmap">
            <i className="nes-ash" />
            <i className="nes-icon is-large heart" />
            <i className={`${pokemonBitmapClass}`} />
          </div>
          <h2>Seu carrinho de compras</h2>
          <p className="c-shopping-cart__description">
            Aqui você encontra os pokémons escolhidos. Caso não queira mais adquirir algum amiguinho
            em específico, basta removê-lo da lista
          </p>
          <p className="c-shopping-cart__total">
            TOTAL: <i className="nes-icon coin is-small" />
            {total}
          </p>
          <button
            type="button"
            className={`nes-btn c-shopping-cart__checkout-btn ${checkoutBtnClass} ${
              !pokemonOnCart.length ? 'is-disabled' : ''
            }`}
            onClick={handleCheckout}
            disabled={!pokemonOnCart.length}
          >
            Finalizar compra
          </button>
        </div>
        <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-8--lg">
          <CartList>
            {!pokemonOnCart.length && (
              <div className="c-shopping-cart__empty-cart-item">Carrinho vazio :(</div>
            )}
            {pokemonOnCart.map((p) => (
              <CartItem
                key={`cart-item/${p.id}`}
                id={p.id}
                name={p.name}
                price={p.price}
                amount={numberOfPokemonById[p.id]}
                onRemoveFromCart={handleRemovePokemonFromCart}
              />
            ))}
          </CartList>
        </div>
      </section>
      <dialog className="nes-dialog" ref={checkoutDialog}>
        <form method="dialog">
          <p>Obrigado pela compra!!</p>
          <p>Continue aproveitando as nossas lojas :)</p>
          <button type="button" className="nes-btn" onClick={handleCloseDialog}>
            Fechar
          </button>
        </form>
      </dialog>
    </>
  );
}

ShoppingCart.defaultProps = {
  pokemonBitmapClass: 'nes-pokeball',
  checkoutBtnClass: ''
};

ShoppingCart.propTypes = {
  storeCartKey: PropTypes.string.isRequired,
  pokemonBitmapClass: PropTypes.string,
  checkoutBtnClass: PropTypes.string
};

export default ShoppingCart;
