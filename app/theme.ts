// New color palette from the design
export const colors = {
  background: '#ffeca5', // A warm off-white
  text: '#1E1E1E', // Dark charcoal
  primary: '#5e17eb', // purple
  secondary: '#ff66c4', // pink
  accent: '#8E9AAF', // Slate Blue/Gray
  white: '#ffffff',
  textSecondary: '#8E9AAF', // Using accent for secondary text
  textMuted: '#B0B8C4', // A lighter gray for placeholders
  border: '#EAEAEA', // A light gray for borders
  primaryLight: '#E8E1F9',
  primaryDark: '#C8C1D9',
  secondaryLight: '#F5B8A5',
  secondaryDark: '#E59885',
  surface: '#ffffff', // White
  surfaceLight: '#F8F5F2',
  success: '#10b981', // Emerald
  error: '#ef4444', // Red
  warning: '#f59e0b', // Amber
  borderLight: '#F0F0F0',
  black: '#000000',
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 28, fontWeight: '600' as const },
  h3: { fontSize: 24, fontWeight: '600' as const },
  h4: { fontSize: 20, fontWeight: '500' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
  captionBold: { fontSize: 14, fontWeight: '600' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
