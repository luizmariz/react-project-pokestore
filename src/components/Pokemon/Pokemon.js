import './Pokemon.scss';

function Pokemon() {
  return (
    <div className="c-pokemon l-flex--column--middle--center">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" />
      <h5>Ivysaur</h5>
      <div>
        <i className="nes-icon coin is-small" />
        <span>10.000,00</span>
      </div>
      <button type="button" className="nes-btn">
        + Carrinho
      </button>
    </div>
  );
}

export default Pokemon;
