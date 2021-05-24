import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './PokemonDetails.scss';

import { addItemToCart } from 'redux/features/cart/cartSlice';
import { selectPriceByPokemonId } from 'redux/features/pokemon/pokemonSlice';
import useFetch from 'hooks/useFetch';

import pokemonService from 'services/pokemonService';

function PokemonDetails({ storeCartKey, checkoutBtnClass }) {
  const { pokemonId } = useParams();
  const { status, entities: pokemon } = useFetch(pokemonService.getPokemonById, pokemonId);

  const dispatch = useDispatch();

  const price = useSelector(selectPriceByPokemonId(pokemon?.id));

  const handleAddPokemonToCart = (e) => {
    e.preventDefault();
    dispatch(addItemToCart({ item: { ...pokemon, price }, store: storeCartKey }));
  };

  return (
    <section className="l-grid l-grid--tab l-grid--lg c-pokemon-details">
      {(status === 'succeeded' && price && (
        <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-start-4--lg l-grid__col-end-8--lg">
          <div className="l-flex--column--middle ">
            <div className="l-flex--column--middle c-pokemon-details__panel">
              <h3 className="c-pokemon-details__pokedex-index">#{pokemon.id}</h3>
              <img
                src={
                  pokemon?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
                    ? pokemon?.sprites?.versions['generation-v']['black-white']?.animated
                        ?.front_default
                    : pokemon?.sprites?.front_default
                }
                alt={`${pokemon.name} front sprite animated`}
                className="c-pokemon-details__sprite"
              />
              <h2>{pokemon.name}</h2>
            </div>
            <div className="l-flex--column--middle c-pokemon-details__panel">
              <h4 className="c-pokemon-details__subtitle">Status Base</h4>
              <p className="c-pokemon-details__stat">altura: {pokemon.height}</p>
              <p className="c-pokemon-details__stat">peso: {pokemon.weight}</p>
              <p className="c-pokemon-details__stat">experiência: {pokemon.base_experience}</p>
            </div>
            <div className="l-flex--column--middle c-pokemon-details__panel">
              <h4 className="c-pokemon-details__subtitle">Galeria shiny</h4>
              <div className="l-flex">
                {pokemon?.sprites?.front_shiny && (
                  <img
                    src={pokemon?.sprites?.front_shiny}
                    alt={`${pokemon.name} shiny front sprite`}
                    className="c-pokemon-details__sprite"
                  />
                )}
                {pokemon?.sprites?.back_shiny && (
                  <img
                    src={pokemon?.sprites?.back_shiny}
                    alt={`${pokemon.name} shiny front sprite`}
                    className="c-pokemon-details__sprite"
                  />
                )}
              </div>
            </div>
            <div className="l-flex--column--middle c-pokemon-details__panel">
              <h4 className="c-pokemon-details__subtitle c-pokemon-details__promo-subtitle--animated">
                Oferta por tempo limitado!!
              </h4>
              <p>
                <i className="nes-icon coin is-small" />
                <span>{price}</span>
              </p>
            </div>
            <button
              type="button"
              className={`nes-btn ${checkoutBtnClass}`}
              onClick={handleAddPokemonToCart}
            >
              + Carrinho
            </button>
          </div>
        </div>
      )) || <p data-testid="loading-indicator">Carregando...</p>}
    </section>
  );
}

PokemonDetails.propTypes = {
  storeCartKey: PropTypes.string.isRequired,
  checkoutBtnClass: PropTypes.string
};

PokemonDetails.defaultProps = {
  checkoutBtnClass: ''
};

export default PokemonDetails;
