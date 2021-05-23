import { Link } from 'react-router-dom';
import './Pokemon.scss';

import PropTypes from 'prop-types';

function Pokemon({ id, name, price, spriteUrl, onAddToCart, href }) {
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    onAddToCart({ id, name, price });
  };

  return (
    <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
      <Link to={href} className="c-store-home__pokemon-card">
        <div className="c-pokemon l-flex--column--middle--center">
          <img src={spriteUrl} alt={`${name} front sprite`} className="c-pokemon__sprite" />
          <h5 data-testid="pokemon-name">{name}</h5>
          <p>
            <i className="nes-icon coin is-small" />
            <span data-testid="pokemon-price">{price}</span>
          </p>
          <button type="button" className="nes-btn" onClick={handleAddToCartClick}>
            + Carrinho
          </button>
        </div>
      </Link>
    </li>
  );
}

Pokemon.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  spriteUrl: PropTypes.string,
  onAddToCart: PropTypes.func,
  href: PropTypes.string
};

Pokemon.defaultProps = {
  id: 0,
  name: '',
  price: 0,
  href: '',
  spriteUrl: '',
  onAddToCart: () => {}
};

export default Pokemon;
