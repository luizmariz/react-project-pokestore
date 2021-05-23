import PropTypes from 'prop-types';

import './StoreHome.scss';

import PokemonList from 'components/PokemonList';
import Pokemon from 'components/Pokemon';

function StoreHome({ pokemon, onAddPokemonToCart, path }) {
  return (
    <div className="l-grid l-grid--tab l-grid--lg c-store-home">
      <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-12--lg">
        <PokemonList>
          {pokemon.map((p) => (
            <Pokemon
              key={`pokemon-${p.id}`}
              id={p.id}
              name={p.name}
              spriteUrl={p.sprites.front_default}
              price={p.price}
              onAddToCart={onAddPokemonToCart}
              href={`${path}/pokemon/${p.id}`}
            />
          ))}
        </PokemonList>
      </div>
    </div>
  );
}

StoreHome.propTypes = {
  path: PropTypes.string,
  pokemon: PropTypes.arrayOf(PropTypes.object),
  onAddPokemonToCart: PropTypes.func
};

StoreHome.defaultProps = {
  path: '',
  pokemon: PropTypes.arrayOf(PropTypes.object),
  onAddPokemonToCart: PropTypes.func
};

export default StoreHome;
