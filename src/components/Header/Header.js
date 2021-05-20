import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="c-header">
      <section className="c-header__banner">
        <div className="l-grid l-grid--tab l-grid--lg">
          <h5>
            Rede pokestore. Você pode visitar outra das nossas lojas <Link to="/">aqui</Link>!
          </h5>
        </div>
      </section>
      <section className="c-header__content">
        <div className="l-grid l-grid--tab l-grid--lg">
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-4--lg l-flex--middle">
            <Link to="/grass-store">
              <h1 className="c-header__title">Planta Store</h1>
            </Link>
          </div>
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-start-7--lg l-grid__col-end-12--lg l-flex">
            <input
              type="text"
              id="name_field"
              className="nes-input"
              placeholder="Busque aqui seu pokémon favorito"
            />
            <button type="button" className="nes-btn is-success">
              Buscar
            </button>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
