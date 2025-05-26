import { ThemeProvider } from 'styled-components';
import { theme } from '@app/styles';

export const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
