const mockNavigate = jest.fn();

module.exports = {
  useNavigate: () => mockNavigate,
  useNavigationType: () => 'PUSH',
  useLocation: () => ({ pathname: '/' }),
  Routes: ({ children }: { children: React.ReactNode }) => children,
  Route: ({ element }: { element: React.ReactNode }) => element,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  MemoryRouter: ({ children }: { children: React.ReactNode }) => children,
};