export const mockPokemonPrice = (pokemon) =>
  pokemon.map((p) => {
    p.price = Math.floor(Math.random() * 1000000) + 1;
    return p;
  });

/**
 *  No pior caso são 1118 pokémons. Como a api fornece a busca apenas pelo nome completo ou id
 *  do pokémon, não vi mal em usar um filtro do lado do cliente para permitir a busca pelo nome parcial.
 *  Reitero que isso é uma má prática e não deve ser exercida em aplicações reais rs (Inclusive, envolvendo paginação isso seria um desastre)
 */
export const simplePokemonSearchByName = (pokemon, str) =>
  pokemon.filter((p) => p.name.includes(str));
