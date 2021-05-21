import './PokemonList.scss';

import Pokemon from '../Pokemon';

function PokemonList() {
  return (
    <ul className="l-container l-container--tab l-container--lg">
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
      <li className="l-container__col-4 l-container__col-4--tab l-container__col-2--lg">
        <Pokemon />
      </li>
    </ul>
  );
}

export default PokemonList;
