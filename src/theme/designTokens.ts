// Semantic color tokens
export const colors = {
  // Primary
  primary: {
    main: '#2196F3',
    dark: '#1976D2',
    light: '#BBDEFB',
    contrast: '#FFFFFF',
  },
  
  // Status colors
  status: {
    success: '#4CAF50',
    successBg: '#E8F5E9',
    warning: '#FF9800',
    warningBg: '#FFF3E0',
    error: '#F44336',
    errorBg: '#FFEBEE',
    offline: '#9E9E9E',
    offlineBg: '#F5F5F5',
  },
  
  // Semantic
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#BDBDBD',
    disabled: '#BDBDBD',
  },
  
  background: {
    default: '#ECECEC',
    paper: '#FFFFFF',
    hover: '#F5F5F5',
    focus: '#E3F2FD',
  },
  
  border: {
    light: 'rgba(0, 0, 0, 0.12)',
    medium: 'rgba(0, 0, 0, 0.20)',
    dark: 'rgba(0, 0, 0, 0.38)',
  },
};

// Spacing tokens (8px base unit)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

// Typography tokens
export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Border radius tokens
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

// Shadow tokens
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
};

// Transition tokens
export const transitions = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
};