import './ChooseStore.scss';
import logo from '../../assets/images/pokestore-logo.png';

function ChooseStore() {
  const stores = [
    {
      path: '',
      iconClass: 'nes-bulbasaur',
      name: 'PLANTA',
      badgeStyle: 'is-success'
    },
    {
      path: '',
      iconClass: 'nes-charmander',
      name: 'FOGO',
      badgeStyle: 'is-error'
    },
    {
      path: '',
      iconClass: 'nes-squirtle',
      name: 'ÁGUA',
      badgeStyle: 'is-primary'
    }
  ];

  return (
    <section className="l-choose-store-wrapper">
      <div className="l-grid">
        <div className="l-grid__col-4 l-flex--column--center--middle">
          <img src={logo} alt="Pokestore logo" className="c-pokestore-logo" />
          <ul className="l-container l-flex--center">
            {stores.map((store) => (
              <li className="l-container__item">
                <div className="c-pokestore-link l-flex--column--center--middle">
                  <div className="nes-badge">
                    <span className={store.badgeStyle}>{store.name}</span>
                  </div>
                  <i className={store.iconClass} />
                  <i className="nes-pokeball" />
                </div>
              </li>
            ))}
          </ul>
          <div className="nes-container is-rounded is-dark">
            <p>
              Capturar pokemon pode ser uma atividade cansativa. Por isso, a pokestore oferece uma
              rede de marketplaces para que você, treinador, possa comprar os seus tipos favoritos
              de pokemon do conforto da sua casa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChooseStore;
