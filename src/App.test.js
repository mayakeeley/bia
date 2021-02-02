import { render } from '@testing-library/react';
import App from './App';

test('renders welcome page', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("welcome-page")).toBeInTheDocument()
});
