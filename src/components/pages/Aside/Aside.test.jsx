import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Aside from './Aside';

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
      <Aside />,
      container,
    );
  });
  expect(container.textContent).toBe(
    '⚡️ KWPower draw☀️️ KWSolar power production🔌️ KWFed into gridYour devices:',
  );
});
