/**
 * Design tokens.
 *
 * Raw scales live in `colors`; components and pages should use the
 * `semanticTokens` below (bg.surface, text.muted, accent.default …) so that
 * light and dark mode stay in sync without per-component `_dark` overrides.
 */

const brand = {
  50: '#EDFBF4',
  100: '#D3F4E4',
  200: '#A8E8CB',
  300: '#72D6AC',
  400: '#3DBE8A',
  500: '#17A673',
  600: '#0E8660',
  700: '#0B6C4E',
  800: '#0A5640',
  900: '#083F30',
};

// Neutral scale with a slight cool cast; replaces Chakra's default gray.
const gray = {
  25: '#FCFCFD',
  50: '#F8F9FB',
  100: '#F1F3F6',
  200: '#E4E7EC',
  300: '#D0D5DD',
  400: '#98A2B3',
  500: '#667085',
  600: '#475467',
  700: '#344054',
  800: '#1D2939',
  900: '#101828',
  950: '#0C111D',
};

export const colors = { brand, gray };

/**
 * Chart palette — categorical slots in a fixed order, validated for
 * colour-vision deficiency (worst adjacent CVD ΔE 9.2, normal-vision ΔE 19.3)
 * against both card surfaces. Slot 1 is income, slot 2 is spending.
 * Always assign in order; never cycle past 8 — fold extra series into "Other".
 */
const chart = {
  1: { default: '#1baf7a', _dark: '#199e70' }, // aqua
  2: { default: '#eb6834', _dark: '#d95926' }, // orange
  3: { default: '#2a78d6', _dark: '#3987e5' }, // blue
  4: { default: '#eda100', _dark: '#c98500' }, // yellow
  5: { default: '#e87ba4', _dark: '#d55181' }, // magenta
  6: { default: '#008300', _dark: '#008300' }, // green
  7: { default: '#4a3aa7', _dark: '#9085e9' }, // violet
  8: { default: '#e34948', _dark: '#e66767' }, // red
  grid: { default: '#EAECF0', _dark: '#223049' },
  axis: { default: '#98A2B3', _dark: '#6B7A93' },
  muted: { default: '#D0D5DD', _dark: '#3A4760' },
  surface: { default: '#FFFFFF', _dark: '#121A2B' },
};

export const semanticTokens = {
  colors: {
    'bg.canvas': { default: '#F6F7F9', _dark: '#0B1120' },
    'bg.surface': { default: '#FFFFFF', _dark: '#121A2B' },
    'bg.subtle': { default: gray[50], _dark: '#162034' },
    'bg.muted': { default: gray[100], _dark: '#1C2740' },
    'bg.emphasis': { default: gray[200], _dark: '#26334D' },
    'bg.inverse': { default: '#0B1B2B', _dark: '#0E1729' },
    'bg.overlay': { default: 'rgba(16, 24, 40, 0.45)', _dark: 'rgba(0, 0, 0, 0.6)' },

    'border.subtle': { default: gray[200], _dark: '#223049' },
    'border.default': { default: gray[300], _dark: '#2E3C57' },
    'border.strong': { default: gray[400], _dark: '#415073' },

    'text.primary': { default: gray[900], _dark: '#F2F4F7' },
    'text.secondary': { default: gray[600], _dark: '#AEB7C6' },
    'text.muted': { default: gray[500], _dark: '#8390A5' },
    'text.inverse': { default: '#FFFFFF', _dark: '#FFFFFF' },

    'accent.default': { default: brand[600], _dark: brand[400] },
    'accent.emphasis': { default: brand[700], _dark: brand[300] },
    'accent.fg': { default: brand[700], _dark: brand[300] },
    'accent.subtle': { default: brand[50], _dark: 'rgba(61, 190, 138, 0.14)' },
    'accent.muted': { default: brand[100], _dark: 'rgba(61, 190, 138, 0.24)' },

    'positive.fg': { default: '#067647', _dark: '#47CD89' },
    'positive.solid': { default: '#12B76A', _dark: '#32D583' },
    'positive.subtle': { default: '#ECFDF3', _dark: 'rgba(71, 205, 137, 0.14)' },
    'negative.fg': { default: '#B42318', _dark: '#F97066' },
    'negative.solid': { default: '#D92D20', _dark: '#F04438' },
    'negative.subtle': { default: '#FEF3F2', _dark: 'rgba(249, 112, 102, 0.14)' },
    'negative.muted': { default: '#FEE4E2', _dark: 'rgba(249, 112, 102, 0.26)' },
    'warning.fg': { default: '#B54708', _dark: '#FDB022' },
    'warning.solid': { default: '#F79009', _dark: '#FDB022' },
    'warning.subtle': { default: '#FFFAEB', _dark: 'rgba(253, 176, 34, 0.14)' },
    'warning.muted': { default: '#FEF0C7', _dark: 'rgba(253, 176, 34, 0.26)' },
    'info.fg': { default: '#175CD3', _dark: '#84ADFF' },
    'info.subtle': { default: '#EFF8FF', _dark: 'rgba(132, 173, 255, 0.14)' },

    chart,
  },
};

export const fonts = {
  heading: 'var(--font-heading), var(--font-body), system-ui, -apple-system, "Segoe UI", sans-serif',
  body: 'var(--font-body), system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

export const shadows = {
  xs: '0 1px 2px rgba(16, 24, 40, 0.05)',
  sm: '0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.04)',
  md: '0 4px 8px -2px rgba(16, 24, 40, 0.08), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
  lg: '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
  xl: '0 20px 24px -4px rgba(16, 24, 40, 0.10), 0 8px 8px -4px rgba(16, 24, 40, 0.04)',
  outline: '0 0 0 3px rgba(14, 134, 96, 0.28)',
};

export const breakpoints = { sm: '30em', md: '48em', lg: '62em', xl: '80em', '2xl': '96em' };
