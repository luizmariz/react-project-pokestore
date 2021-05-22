import PropTypes from 'prop-types';

import './CartItem.scss';

function CartItem({ id, name, price, onRemoveFromCart, amount }) {
  const handleRemoveCartItem = (e) => {
    e.preventDefault();
    onRemoveFromCart(id);
  };

  return (
    <li className="c-cart-item l-flex--between--middle--wrap">
      <div className="l-flex--middle">
        <i className="nes-pokeball" />
        <span className="c-cart-item__name">
          {name}({amount})
        </span>
      </div>
      <div className="l-flex--middle">
        <i className="nes-icon coin is-small c-cart-item__price-icon" />
        <span className="c-cart-item__price">{price}</span>
        <button type="button" className="nes-btn is-warning" onClick={handleRemoveCartItem}>
          <i className="nes-icon close is-small " />
        </button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onRemoveFromCart: PropTypes.func,
  amount: PropTypes.number.isRequired
};

CartItem.defaultProps = {
  onRemoveFromCart: () => {}
};

export default CartItem;
