import { createTheme, PaletteMode } from '@mui/material';

export function getTheme(paletteMode: PaletteMode) {
  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
    // TODO: define shared Prometheus MUI theme
    // -see Perses example: https://github.com/perses/perses/blob/v0.24.0/ui/components/src/theme/theme.ts
    // palette: getPaletteOptions(mode),
    // typography,
    // mixins: {},
    // components,
  });
  return theme;
}
