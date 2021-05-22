import { Link } from 'react-router-dom';
import './Header.scss';

import PropTypes from 'prop-types';

function Header({
  storeName,
  storePath,
  searchInputPlaceholder,
  searchInputValue,
  onSearchInputChange,
  onSearch,
  onCartClick,
  headerClass,
  searchBtnClass,
  itemsCartCounter
}) {
  return (
    <header className="c-header">
      <section className="c-header__banner">
        <div className="l-grid l-grid--tab l-grid--lg">
          <h5>
            Rede pokestore. Você pode visitar outra das nossas lojas <Link to="/">aqui</Link>!
          </h5>
        </div>
      </section>
      <section className={`c-header__content ${headerClass}`}>
        <div className="l-grid l-grid--tab l-grid--lg">
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-4--lg l-flex--middle">
            <Link to={storePath}>
              <h1 className="c-header__title">{storeName}</h1>
            </Link>
          </div>
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-start-5--lg l-grid__col-end-10--lg l-flex">
            <input
              type="text"
              id="name_field"
              className="nes-input"
              placeholder={searchInputPlaceholder}
              value={searchInputValue}
              onChange={onSearchInputChange}
            />
            <button type="button" className={`nes-btn ${searchBtnClass}`} onClick={onSearch}>
              Buscar
            </button>
          </div>
          <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-start-11--lg l-grid__col-end-12--lg l-flex">
            <button type="button" className="nes-btn c-header__cart-btn" onClick={onCartClick}>
              Carrinho ({itemsCartCounter})
            </button>
          </div>
        </div>
      </section>
    </header>
  );
}

Header.propTypes = {
  storeName: PropTypes.string,
  storePath: PropTypes.string,
  searchInputPlaceholder: PropTypes.string,
  searchInputValue: PropTypes.string,
  headerClass: PropTypes.string,
  searchBtnClass: PropTypes.string,
  itemsCartCounter: PropTypes.number,
  onCartClick: PropTypes.func,
  onSearch: PropTypes.func,
  onSearchInputChange: PropTypes.func
};

Header.defaultProps = {
  storeName: '',
  storePath: '',
  searchInputPlaceholder: 'Busque aqui o seu pokemon',
  searchInputValue: '',
  headerClass: '',
  searchBtnClass: '',
  itemsCartCounter: 0,
  onSearch: () => {},
  onSearchInputChange: () => {},
  onCartClick: () => {}
};

export default Header;
