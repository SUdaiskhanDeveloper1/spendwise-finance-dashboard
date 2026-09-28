/**
 * Component style overrides. Every colour here is a semantic token so the
 * same styles work in light and dark mode.
 */

const focusRing = '0 0 0 3px rgba(14, 134, 96, 0.2)';

const primary = {
  bg: 'accent.default',
  color: 'white',
  boxShadow: 'xs',
  _hover: { bg: 'accent.emphasis', _disabled: { bg: 'accent.default' } },
  _active: { bg: 'brand.800' },
  _dark: { color: 'gray.950', _active: { bg: 'brand.200' } },
};

const secondary = {
  bg: 'bg.surface',
  color: 'text.primary',
  borderWidth: '1px',
  borderColor: 'border.default',
  boxShadow: 'xs',
  _hover: { bg: 'bg.subtle', borderColor: 'border.strong' },
  _active: { bg: 'bg.muted' },
};

const Button = {
  baseStyle: {
    fontWeight: 600,
    borderRadius: 'lg',
    letterSpacing: '-0.005em',
    _focusVisible: { boxShadow: 'outline' },
    _disabled: { opacity: 0.5, cursor: 'not-allowed', boxShadow: 'none' },
  },
  sizes: {
    xs: { h: 7, minW: 7, fontSize: 'xs', px: 2.5 },
    sm: { h: 8, minW: 8, fontSize: 'sm', px: 3 },
    md: { h: 10, minW: 10, fontSize: 'sm', px: 4 },
    lg: { h: 12, minW: 12, fontSize: 'md', px: 5 },
  },
  variants: {
    primary,
    solid: primary,
    secondary,
    outline: secondary,
    ghost: {
      color: 'text.secondary',
      _hover: { bg: 'bg.muted', color: 'text.primary' },
      _active: { bg: 'bg.emphasis' },
    },
    subtle: {
      bg: 'accent.subtle',
      color: 'accent.fg',
      _hover: { bg: 'accent.muted' },
    },
    danger: {
      bg: 'negative.solid',
      color: 'white',
      _hover: { bg: 'negative.fg' },
    },
    inverse: {
      bg: 'white',
      color: 'gray.900',
      _hover: { bg: 'gray.100' },
    },
    link: {
      color: 'accent.fg',
      px: 0,
      h: 'auto',
      minW: 0,
      fontWeight: 600,
      _hover: { textDecoration: 'underline' },
    },
  },
  defaultProps: { variant: 'primary', size: 'md', colorScheme: 'brand' },
};

const fieldOutline = {
  field: {
    bg: 'bg.surface',
    borderColor: 'border.default',
    color: 'text.primary',
    boxShadow: 'xs',
    _placeholder: { color: 'text.muted' },
    _hover: { borderColor: 'border.strong' },
    _focusVisible: { borderColor: 'accent.default', boxShadow: focusRing },
    _invalid: { borderColor: 'negative.solid', boxShadow: 'none' },
  },
  addon: {
    bg: 'bg.subtle',
    borderColor: 'border.default',
    color: 'text.secondary',
  },
};

const fieldSizes = {
  sm: {
    field: { '--input-font-size': 'fontSizes.sm', '--input-padding': 'space.3', '--input-border-radius': 'radii.md', '--input-height': 'sizes.8' },
    addon: { '--input-font-size': 'fontSizes.sm', '--input-padding': 'space.3', '--input-border-radius': 'radii.md', '--input-height': 'sizes.8' },
    group: { '--input-font-size': 'fontSizes.sm', '--input-padding': 'space.3', '--input-border-radius': 'radii.md', '--input-height': 'sizes.8' },
  },
  md: {
    field: { '--input-font-size': 'fontSizes.sm', '--input-padding': 'space.3', '--input-border-radius': 'radii.lg', '--input-height': 'sizes.10' },
    addon: { '--input-font-size': 'fontSizes.sm', '--input-padding': 'space.3', '--input-border-radius': 'radii.lg', '--input-height': 'sizes.10' },
    group: { '--input-font-size': 'fontSizes.sm', '--input-padding': 'space.3', '--input-border-radius': 'radii.lg', '--input-height': 'sizes.10' },
  },
};

const Input = { variants: { outline: fieldOutline }, sizes: fieldSizes };
const Select = {
  variants: { outline: fieldOutline },
  sizes: fieldSizes,
  baseStyle: { icon: { color: 'text.muted' } },
};
const NumberInput = { variants: { outline: fieldOutline }, sizes: fieldSizes };
const Textarea = {
  variants: { outline: fieldOutline.field },
  sizes: { md: { fontSize: 'sm', px: 3, py: 2.5, borderRadius: 'lg' } },
};

const Form = {
  baseStyle: {
    helperText: { color: 'text.muted', fontSize: 'xs', mt: 1.5 },
    requiredIndicator: { color: 'negative.fg' },
  },
};
const FormLabel = {
  baseStyle: { fontSize: 'sm', fontWeight: 500, color: 'text.primary', mb: 1.5, me: 0 },
};
const FormError = { baseStyle: { text: { color: 'negative.fg', fontSize: 'xs', mt: 1.5 } } };

const Heading = {
  baseStyle: { fontFamily: 'heading', fontWeight: 700, color: 'text.primary' },
  sizes: {
    display: { fontSize: ['2.5rem', '3.25rem', '3.75rem'], lineHeight: 1.06, letterSpacing: '-0.03em' },
    '2xl': { fontSize: ['2rem', '2.5rem'], lineHeight: 1.12, letterSpacing: '-0.03em' },
    xl: { fontSize: ['1.5rem', '1.75rem'], lineHeight: 1.2, letterSpacing: '-0.025em' },
    lg: { fontSize: ['1.25rem', '1.375rem'], lineHeight: 1.25, letterSpacing: '-0.02em' },
    md: { fontSize: '1.0625rem', lineHeight: 1.35, letterSpacing: '-0.015em', fontWeight: 600 },
    sm: { fontSize: '0.9375rem', lineHeight: 1.4, letterSpacing: '-0.01em', fontWeight: 600 },
    xs: { fontSize: '0.875rem', lineHeight: 1.4, fontWeight: 600 },
  },
  defaultProps: { size: 'xl' },
};

const Badge = {
  baseStyle: {
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 'full',
    px: 2,
    py: 0.5,
    fontSize: 'xs',
    letterSpacing: 0,
  },
  variants: {
    neutral: { bg: 'bg.muted', color: 'text.secondary' },
    accent: { bg: 'accent.subtle', color: 'accent.fg' },
    positive: { bg: 'positive.subtle', color: 'positive.fg' },
    negative: { bg: 'negative.subtle', color: 'negative.fg' },
    warning: { bg: 'warning.subtle', color: 'warning.fg' },
    info: { bg: 'info.subtle', color: 'info.fg' },
    outline: { bg: 'transparent', color: 'text.secondary', boxShadow: 'inset 0 0 0 1px var(--chakra-colors-border-default)' },
    inverse: { bg: 'whiteAlpha.200', color: 'white' },
  },
  defaultProps: { variant: 'neutral' },
};

const Table = {
  variants: {
    simple: {
      th: {
        textTransform: 'none',
        letterSpacing: 0,
        fontSize: 'xs',
        fontWeight: 500,
        color: 'text.muted',
        fontFamily: 'body',
        bg: 'bg.subtle',
        borderColor: 'border.subtle',
        py: 3,
        px: 4,
      },
      td: { fontSize: 'sm', borderColor: 'border.subtle', py: 3, px: 4, color: 'text.primary' },
      tbody: { tr: { '&:last-of-type td': { borderBottomWidth: 0 } } },
    },
  },
};

const Tabs = {
  variants: {
    line: {
      tablist: { borderBottom: '1px solid', borderColor: 'border.subtle', gap: 5 },
      tab: {
        px: 0.5,
        py: 3,
        fontSize: 'sm',
        fontWeight: 500,
        color: 'text.muted',
        mb: '-1px',
        borderBottom: '2px solid',
        borderColor: 'transparent',
        _selected: { color: 'text.primary', borderColor: 'accent.default', fontWeight: 600 },
        _hover: { color: 'text.primary' },
        _active: { bg: 'transparent' },
      },
      tabpanel: { px: 0, pt: 6, pb: 0 },
    },
    segmented: {
      tablist: { bg: 'bg.muted', p: 1, borderRadius: 'lg', display: 'inline-flex', gap: 1 },
      tab: {
        px: 3,
        h: 8,
        fontSize: 'sm',
        fontWeight: 500,
        color: 'text.secondary',
        borderRadius: 'md',
        _selected: { bg: 'bg.surface', color: 'text.primary', boxShadow: 'sm' },
      },
      tabpanel: { px: 0, pt: 6, pb: 0 },
    },
  },
  defaultProps: { variant: 'line', colorScheme: 'brand' },
};

const Modal = {
  baseStyle: {
    overlay: { bg: 'bg.overlay', backdropFilter: 'blur(2px)' },
    dialog: { bg: 'bg.surface', borderRadius: 'xl', boxShadow: 'xl', mx: 4, color: 'text.primary' },
    header: { fontFamily: 'heading', fontSize: 'lg', fontWeight: 700, letterSpacing: '-0.02em', pt: 5, pb: 1, px: 6 },
    closeButton: { top: 4, insetEnd: 4, borderRadius: 'md', color: 'text.muted' },
    body: { px: 6, py: 4 },
    footer: { px: 6, pt: 2, pb: 5, gap: 3 },
  },
};

const Drawer = {
  baseStyle: {
    overlay: { bg: 'bg.overlay', backdropFilter: 'blur(2px)' },
    dialog: { bg: 'bg.surface', color: 'text.primary' },
    header: { fontFamily: 'heading', fontSize: 'lg', fontWeight: 700, letterSpacing: '-0.02em', borderBottomWidth: '1px', borderColor: 'border.subtle', py: 4 },
    closeButton: { top: 3.5, insetEnd: 4, borderRadius: 'md', color: 'text.muted' },
    body: { py: 5 },
    footer: { borderTopWidth: '1px', borderColor: 'border.subtle', gap: 3 },
  },
};

const Menu = {
  baseStyle: {
    list: {
      bg: 'bg.surface',
      borderColor: 'border.subtle',
      boxShadow: 'lg',
      borderRadius: 'lg',
      p: 1,
      minW: '220px',
      zIndex: 20,
    },
    item: {
      bg: 'transparent',
      borderRadius: 'md',
      fontSize: 'sm',
      px: 2.5,
      py: 2,
      color: 'text.primary',
      _hover: { bg: 'bg.muted' },
      _focus: { bg: 'bg.muted' },
    },
    groupTitle: { fontSize: 'xs', fontWeight: 500, color: 'text.muted', mx: 2.5, my: 2 },
    divider: { borderColor: 'border.subtle', my: 1 },
  },
};

const Popover = {
  baseStyle: {
    content: {
      bg: 'bg.surface',
      borderColor: 'border.subtle',
      boxShadow: 'lg',
      borderRadius: 'xl',
      '--popper-arrow-bg': 'var(--chakra-colors-bg-surface)',
      _focusVisible: { boxShadow: 'lg' },
    },
    header: { borderColor: 'border.subtle', fontWeight: 600, fontSize: 'sm', px: 4, py: 3 },
    body: { px: 4, py: 3 },
    footer: { borderColor: 'border.subtle' },
  },
};

const Tooltip = {
  baseStyle: {
    '--tooltip-bg': 'var(--chakra-colors-gray-900)',
    '--popper-arrow-bg': 'var(--chakra-colors-gray-900)',
    bg: 'gray.900',
    color: 'white',
    fontSize: 'xs',
    fontWeight: 500,
    borderRadius: 'md',
    px: 2.5,
    py: 1.5,
    _dark: { '--tooltip-bg': 'var(--chakra-colors-gray-700)', bg: 'gray.700' },
  },
};

// Chakra renders toasts with the Alert "solid" variant — styled here as a
// compact inverse card; inline alerts use the "subtle" variant.
const Alert = {
  variants: {
    solid: (props: { colorScheme: string }) => ({
      container: {
        bg: 'gray.900',
        color: 'white',
        borderRadius: 'lg',
        boxShadow: 'xl',
        px: 4,
        py: 3,
        _dark: { bg: 'gray.800', borderWidth: '1px', borderColor: 'whiteAlpha.200' },
      },
      title: { fontSize: 'sm', fontWeight: 600 },
      description: { fontSize: 'sm', color: 'whiteAlpha.800' },
      icon: { color: `${props.colorScheme}.300` },
    }),
    subtle: (props: { colorScheme: string }) => ({
      container: {
        borderRadius: 'lg',
        borderWidth: '1px',
        bg: `${props.colorScheme}.50`,
        borderColor: `${props.colorScheme}.100`,
        _dark: { bg: 'whiteAlpha.50', borderColor: 'whiteAlpha.200' },
      },
      title: { fontSize: 'sm', fontWeight: 600 },
      description: { fontSize: 'sm' },
    }),
  },
};

const Switch = {
  baseStyle: {
    track: {
      bg: 'bg.emphasis',
      _checked: { bg: 'accent.default' },
      _focusVisible: { boxShadow: 'outline' },
    },
    thumb: { bg: 'white' },
  },
  defaultProps: { colorScheme: 'brand' },
};

const Checkbox = {
  baseStyle: {
    control: {
      borderRadius: 'md',
      borderColor: 'border.default',
      _checked: { bg: 'accent.default', borderColor: 'accent.default', _hover: { bg: 'accent.emphasis', borderColor: 'accent.emphasis' } },
    },
    label: { fontSize: 'sm' },
  },
  defaultProps: { colorScheme: 'brand' },
};

const Radio = {
  baseStyle: {
    control: {
      borderColor: 'border.default',
      _checked: { bg: 'accent.default', borderColor: 'accent.default', _hover: { bg: 'accent.emphasis', borderColor: 'accent.emphasis' } },
    },
    label: { fontSize: 'sm' },
  },
  defaultProps: { colorScheme: 'brand' },
};

const Skeleton = {
  baseStyle: {
    '--skeleton-start-color': 'var(--chakra-colors-bg-muted)',
    '--skeleton-end-color': 'var(--chakra-colors-bg-emphasis)',
    borderRadius: 'md',
  },
};

const Divider = { baseStyle: { borderColor: 'border.subtle', opacity: 1 } };

const Accordion = {
  baseStyle: {
    container: { borderColor: 'border.subtle' },
    button: {
      py: 4,
      px: 0,
      fontWeight: 600,
      fontSize: 'md',
      color: 'text.primary',
      _hover: { bg: 'transparent', color: 'accent.fg' },
    },
    panel: { px: 0, pt: 0, pb: 5, color: 'text.secondary', fontSize: 'sm', lineHeight: 1.7 },
  },
};

const Avatar = {
  baseStyle: {
    container: { borderColor: 'bg.surface', fontWeight: 600 },
    excessLabel: { bg: 'bg.muted', color: 'text.secondary', borderColor: 'bg.surface' },
  },
};

const Kbd = {
  baseStyle: {
    bg: 'bg.muted',
    borderColor: 'border.subtle',
    borderWidth: '1px',
    borderBottomWidth: '1px',
    borderRadius: 'sm',
    color: 'text.muted',
    fontSize: '0.6875rem',
    fontFamily: 'body',
    fontWeight: 500,
    px: 1.5,
  },
};

const Link = { baseStyle: { _hover: { textDecoration: 'none' } } };

export const components = {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Form,
  FormError,
  FormLabel,
  Heading,
  Input,
  Kbd,
  Link,
  Menu,
  Modal,
  NumberInput,
  Popover,
  Radio,
  Select,
  Skeleton,
  Switch,
  Table,
  Tabs,
  Textarea,
  Tooltip,
};
