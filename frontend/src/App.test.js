import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Employee Management System header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Employee Management System/i);
  expect(headerElement).toBeInTheDocument();
});
