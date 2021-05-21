import './GrassStore.scss';

import Header from '../../components/Header';
import Cart from '../../components/Cart';
import PokemonList from '../../components/PokemonList';

function GrassStore() {
  return (
    <section className="c-grass-store">
      <Header />
      <div className="l-grid l-grid--tab l-grid--lg c-grass-store__body">
        <div className="l-grid__col-4 l-grid__col-8--tab l-grid__col-12--lg">
          <PokemonList />
        </div>
        {/* <aside className="l-grid__col-5--lg">
          <Cart />
        </aside> */}
      </div>
    </section>
  );
}

export default GrassStore;
