import React from 'react';
import { render, waitForElement, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from './App';

it('renders the app', async () => {
  const { getByRole } =  render (<App />);
  const button = await waitForElement(() => getByRole("button"));
  expect(button).toHaveTextContent('Get New Readings')
  fireEvent.click(button);
  expect(button).toHaveAttribute('disabled');
  
});
