import React, {useMemo} from 'react';
import {CssBaseline, ThemeOptions} from '@mui/material';
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
import customShadows from './customShadows';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';

// eslint-disable-next-line react/function-component-definition
export default function ThemeProvider({children}: any) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: {borderRadius: 6},
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions as unknown as ThemeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
