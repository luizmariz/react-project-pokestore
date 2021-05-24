describe('As a pokémon trainer i wanna buy a squirtle', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should navigate to pokestore', async () => {
    const title = await page.title();

    expect(title).toBe('Pokestore');
  });

  it('should render links to type stores', async () => {
    const links = await page.$$eval('a', (els) => els.map((el) => el.innerText));

    expect(links.length).toBe(3);
    expect(links).toContain('PLANTA');
    expect(links).toContain('FOGO');
    expect(links).toContain('ÁGUA');
  });

  it('should navigate to water store on link click', async () => {
    await page.click('a[href*="water"]');
    await page.waitForTimeout(1000);

    const storeName = await page.$eval('h1', (el) => el.innerText);

    expect(storeName).toBe('ÁGUA STORE');
  });

  it('should find the desired pokemon via search bar', async () => {
    page.waitForFunction(`document.querySelector('p[data-testid="loading-indicator"]') === null`);

    const searchInputSelector = 'input[placeholder*="Busque"]';
    const pokemonToSearch = 'squirtle';

    await page.type(searchInputSelector, pokemonToSearch, { delay: 100 });

    const searchInputValue = await page.$eval(searchInputSelector, (el) => el.value);

    expect(searchInputValue).toBe(pokemonToSearch);

    await page.click('button[data-testid="search-btn"]');
    await page.waitForTimeout(250);

    const firstPokemonMatchName = await page.$eval('div.c-pokemon > h5', (el) => el.innerText);

    expect(firstPokemonMatchName).toBe('squirtle');
  });
});
