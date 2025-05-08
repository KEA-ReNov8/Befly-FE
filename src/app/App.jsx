import { QueryProvider, AppRouterProvider, AppThemeProvider } from '@app/providers';
import { GlobalStyle } from '@app/styles';

function App() {
  return (
    <AppThemeProvider>
      <QueryProvider>
        <GlobalStyle />
        <AppRouterProvider />
      </QueryProvider>
    </AppThemeProvider>
  )
}

export default App
