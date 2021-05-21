import './PokemonList.scss';

import PropTypes from 'prop-types';

function PokemonList({ children }) {
  return <ul className="l-container l-container--tab l-container--lg">{children}</ul>;
}

PokemonList.defaultProps = {
  children: []
};

PokemonList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default PokemonList;
