import React, { useState, useEffect } from 'react';
import { Provider, defaultTheme, darkTheme } from '@adobe/react-spectrum';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RomanNumeralConverter from './components/RomanNumeralConverter.jsx';

const queryClient = new QueryClient();

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // useEffect to update the color scheme when the user's system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider theme={isDark ? darkTheme : defaultTheme}>
        <RomanNumeralConverter />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
