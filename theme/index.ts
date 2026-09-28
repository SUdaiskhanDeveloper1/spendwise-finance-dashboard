import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { breakpoints, colors, fonts, semanticTokens, shadows } from './foundations';
import { components } from './components';

const config: ThemeConfig = { initialColorMode: 'light', useSystemColorMode: false };

export const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  fonts,
  shadows,
  breakpoints,
  components,
  textStyles: {
    // Equal-width digits for numbers that line up in columns (tables, lists, axes).
    numeric: { fontVariantNumeric: 'tabular-nums' },
  },
  styles: {
    global: {
      'html, body': { bg: 'bg.canvas', color: 'text.primary' },
      body: {
        fontSize: 'sm',
        lineHeight: 1.55,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      },
      '*::placeholder': { color: 'text.muted' },
      '*, *::before, *::after': { borderColor: 'border.subtle' },
      '::selection': { bg: 'brand.200', color: 'gray.900' },
    },
  },
});
