import './Pokemon.scss';

import PropTypes from 'prop-types';

function Pokemon({ name, price, spriteUrl }) {
  return (
    <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
      <div className="c-pokemon l-flex--column--middle--center">
        <img src={spriteUrl} alt={`${name} front sprite`} className="c-pokemon__sprite" />
        <h5>{name}</h5>
        <div>
          <i className="nes-icon coin is-small" />
          <span>{price}</span>
        </div>
        <button type="button" className="nes-btn">
          + Carrinho
        </button>
      </div>
    </li>
  );
}

Pokemon.defaultProps = {
  spriteUrl: ''
};

Pokemon.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spriteUrl: PropTypes.string
};

export default Pokemon;
