import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Aside from './Aside';
import OverviewContextProvider from '../../contexts/OverviewContext';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render', () => {
  act(() => {
    render(
      <OverviewContextProvider>
        <Aside />
      </OverviewContextProvider>,
      container,
    );
  });
  expect(container.textContent).toBe('Your devices:');
});
