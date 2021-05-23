import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Pokemon from '../Pokemon';

const props = {
  id: 24,
  name: 'test-pokemon',
  price: 9999,
  handleAddToCart: jest.fn(),
  href: '/pokemon/24'
};

const setup = () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Pokemon
        id={props.id}
        name={props.name}
        price={props.price}
        href={props.href}
        onAddToCart={props.handleAddToCart}
      />
    </Router>
  );

  const addToCartBtn = screen.getByRole('button');

  return { addToCartBtn };
};

it('Renders <Pokemon /> correctly', () => {
  const { addToCartBtn } = setup();

  expect(screen.getByTestId('pokemon-name')).toHaveTextContent(props.name);
  expect(screen.getByTestId('pokemon-price')).toHaveTextContent(props.price);
  expect(addToCartBtn).toHaveTextContent(/\+ carrinho/i);
  expect(addToCartBtn).toBeEnabled();
});

it('Correctly fires handleAddToCart to cart on button click', () => {
  const { addToCartBtn } = setup();

  for (let i = 0; i < 3; i++) {
    userEvent.click(addToCartBtn);
  }

  expect(props.handleAddToCart).toHaveBeenCalledTimes(3);
  expect(props.handleAddToCart).toHaveBeenCalledWith({
    id: props.id,
    name: props.name,
    price: props.price
  });
});
