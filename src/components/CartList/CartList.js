import PropTypes from 'prop-types';

import './CartList.scss';

function CartList({ children }) {
  return (
    <div className="c-cart-list">
      <ul>{children}</ul>
    </div>
  );
}

CartList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default CartList;
