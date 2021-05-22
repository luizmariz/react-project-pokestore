import PropTypes from 'prop-types';

function PokemonList({ children }) {
  return <ul className="l-container l-container--tab l-container--lg">{children}</ul>;
}

PokemonList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

PokemonList.defaultProps = {
  children: []
};

export default PokemonList;
