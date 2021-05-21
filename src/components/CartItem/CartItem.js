import './CartItem.scss';

function CartItem() {
  return (
    <li className="c-cart-item l-flex--between--middle">
      <div className="l-flex--middle">
        <i className="nes-pokeball" />
        <span className="c-cart-item__name">Nome do pokemon</span>
      </div>
      <div className="l-flex--middle">
        <i className="nes-icon coin is-small" />
        <span className="c-cart-item__price">10.000,00</span>
        <i className="nes-icon close is-small c-cart-item__remove-btn" />
      </div>
    </li>
  );
}

export default CartItem;
