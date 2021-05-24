export const mockPokemonPrice = (pokemon) =>
  pokemon.map((p) => {
    p.price = Math.floor(Math.random() * 10000) + 1;
    return p;
  });

/**
 *  No pior caso são 1118 pokémons. Como a api fornece a busca apenas pelo nome completo ou id
 *  do pokémon, não vi mal em usar um filtro do lado do cliente para permitir a busca pelo nome parcial.
 *  Reitero que isso é uma má prática e não deve ser exercida em aplicações reais rs (Inclusive, envolvendo paginação isso seria um desastre)
 */
export const simplePokemonSearchByName = (pokemon, str) =>
  pokemon.filter((p) => p.name.toLowerCase().includes(str.toLowerCase()));

export const getPersistedCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (!serializedCart) {
      return null;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    // console.log(err);
    return null;
  }
};

export const persistCart = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem('cart', serializedCart);
    // eslint-disable-next-line no-empty
  } catch {}
};
