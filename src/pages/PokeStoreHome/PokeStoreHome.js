import { Link } from 'react-router-dom';

import './PokeStoreHome.scss';

import logo from 'assets/images/pokestore-logo.png';

function PokeStoreHome() {
  const stores = [
    {
      path: '/grass-store',
      iconClass: 'nes-bulbasaur',
      name: 'PLANTA',
      badgeStyle: 'is-success'
    },
    {
      path: '/fire-store',
      iconClass: 'nes-charmander',
      name: 'FOGO',
      badgeStyle: 'is-error'
    },
    {
      path: '/water-store',
      iconClass: 'nes-squirtle',
      name: 'ÁGUA',
      badgeStyle: 'is-primary'
    }
  ];

  return (
    <section className="l-choose-store-wrapper">
      <div className="c-choose-store l-grid">
        <div className="l-grid__col-4 l-flex--column--center--middle">
          <img src={logo} alt="Pokestore logo" className="c-choose-store__pokestore-logo" />
          <ul className="l-container l-flex--center">
            {stores.map((store) => (
              <li className="l-container__item" key={`${store.name}/${store.path}`}>
                <Link
                  to={store.path}
                  className="c-choose-store__pokestore-link l-flex--column--center--middle"
                >
                  <div className="nes-badge">
                    <span className={store.badgeStyle}>{store.name}</span>
                  </div>
                  <i className={store.iconClass} />
                  <i className="nes-pokeball" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="nes-container is-rounded is-dark">
            <p>
              Capturar pokémon pode ser uma atividade cansativa. Por isso, a pokestore oferece uma
              rede de marketplaces para que você, treinador, possa comprar os seus tipos favoritos
              de pokemon do conforto da sua casa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokeStoreHome;
