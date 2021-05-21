import './Cart.scss';

import CartItem from '../CartItem';

function Cart() {
  return (
    <div className="nes-container with-title c-cart">
      <p className="title">Carrinho</p>
      <ul>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ul>
      <div className="l-flex--between c-cart__total">
        <p>Total:</p>
        <p>
          <i className="nes-icon coin is-small" />
          <span>10.000,00</span>
        </p>
      </div>
      <button type="button" className="nes-btn is-success">
        Finalizar Compra
      </button>
    </div>
  );
}

export default Cart;
