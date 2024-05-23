import { render, screen } from '@testing-library/react';
import FacilitySearchApp from 'components/ACR/FacilitySearch/FacilitySearchApp';
import { defaultMockData as mockData } from './FacilitySearch.mock';

const TEST_ID = 'FacilitySearch_TEST';

test('FacilitySearch unit tests', () => {
  render(<FacilitySearchApp {...mockData} testId={TEST_ID} />);
  const element = screen.getByTestId(TEST_ID);
  expect(element).toBeInTheDocument();
});
