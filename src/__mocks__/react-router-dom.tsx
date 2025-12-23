// Simple mock for react-router-dom
export const useNavigate = () => jest.fn();
export const MemoryRouter = ({ children }: { children: React.ReactNode }) => children;
export const BrowserRouter = ({ children }: { children: React.ReactNode }) => children;
export const Routes = ({ children }: { children: React.ReactNode }) => children;
export const Route = ({ element }: { element: React.ReactNode }) => element;
export const useNavigationType = () => 'PUSH';
export const useLocation = () => ({ pathname: '/' });