import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, StyledEngineProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const muiTheme = createTheme();

interface RouterTestProvidersProps {
  children: React.ReactNode;
}

// Configure Jest to handle date-fns ES modules
jest.mock('@mui/x-date-pickers/AdapterDateFns', () => ({
  AdapterDateFns: class MockAdapterDateFns {
    date() {
      return new Date();
    }
    formatByString() {
      return '';
    }
    isValid() {
      return true;
    }
    isEqual() {
      return true;
    }
    isSameDay() {
      return true;
    }
    isSameMonth() {
      return true;
    }
    isAfter() {
      return false;
    }
    startOfDay() {
      return new Date();
    }
    endOfDay() {
      return new Date();
    }
    addDays() {
      return new Date();
    }
    isWithinRange() {
      return false;
    }
    parse() {
      return new Date();
    }
    format() {
      return '';
    }
  }
}));

const RouterTestProviders: React.FC<RouterTestProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

const renderWithRouter = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: RouterTestProviders, ...options });

export * from '@testing-library/react';
export { renderWithRouter };