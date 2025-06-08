/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      back: jest.fn(),
    })),
    useSearchParams: jest.fn(),
  };
});

jest.mock('funds-web', () => ({
  ...jest.requireActual('funds-web'),
  toast: jest.fn(),
}));
