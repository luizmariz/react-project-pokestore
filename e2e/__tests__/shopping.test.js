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
    await page.waitForSelector('h1');

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
  it('should add squirtle to cart', async () => {
    await page.click('div.c-pokemon > button');

    const cartBtnText = await page.$eval('button[class*="cart"]', (el) => el.innerText);

    expect(cartBtnText).toBe('Carrinho (1)');
  });
  it('should navigate to cart on cart button click', async () => {
    await page.click('button[class*="cart"]');
    await page.waitForTimeout(250);

    const pageTitle = await page.$eval('h2', (el) => el.innerText);

    expect(pageTitle).toBe('Seu carrinho de compras');
  });
  it('should check if cart content is correct', async () => {
    const itemPrice = await page.$eval('span.c-cart-item__price', (el) => el.innerText);
    const total = await page.$eval('p.c-shopping-cart__total', (el) => el.innerText);

    expect(total.includes(itemPrice)).toBeTruthy();
  });
  it('should checkout', async () => {
    const isCheckoutBtnDisabled = await page.$eval(
      '.c-shopping-cart__checkout-btn',
      (el) => el.disabled
    );

    expect(isCheckoutBtnDisabled).toBeFalsy();

    await page.click('button.c-shopping-cart__checkout-btn');

    const modalThanks = await page.$eval('[class*="dialog"] p', (el) => el.innerText);

    expect(modalThanks).toBe('Obrigado pela compra!!');

    const cartBtnText = await page.$eval('button[class*="cart"]', (el) => el.innerText);
    const emptyCartItem = await page.$eval(
      'div.c-shopping-cart__empty-cart-item',
      (el) => el.innerText
    );

    expect(cartBtnText).toBe('Carrinho (0)');
    expect(emptyCartItem).toBe('Carrinho vazio :(');
  });
});
