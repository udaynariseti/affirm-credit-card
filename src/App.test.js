import { render, screen } from '@testing-library/react';
import App from './App';

test('renders payment collection form', () => {
  render(<App />);
  const headerElement = screen.getByText(/Enter payment details to continue.../i);
  const paymentForm = screen.queryByTestId('payment-form');

  expect(headerElement).toBeInTheDocument();
  expect(paymentForm).toBeInTheDocument();
});
