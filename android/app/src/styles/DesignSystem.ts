// Design System for College Vyapari
// Based on the logo: Black background, White "College", Light Blue Malayalam "വ്യാപാരി", Grey tagline

export const Colors = {
  // Primary Colors (from logo)
  primary: '#000000',        // Black from logo
  secondary: '#00BFFF',      // Light blue from Malayalam text
  accent: '#FFFFFF',         // White from logo
  
  // Extended Color Palette
  background: '#F8FAFC',     // Light grey background
  surface: '#FFFFFF',       // White cards/surfaces
  surfaceSecondary: '#F1F5F9', // Light grey for secondary surfaces
  
  // Text Colors
  textPrimary: '#1F2937',   // Dark grey for primary text
  textSecondary: '#6B7280', // Medium grey for secondary text
  textTertiary: '#9CA3AF',  // Light grey for tertiary text
  textInverse: '#FFFFFF',   // White text on dark backgrounds
  
  // Status Colors
  success: '#10B981',       // Green for success states
  warning: '#F59E0B',       // Orange for warnings
  error: '#EF4444',         // Red for errors
  info: '#3B82F6',          // Blue for info
  
  // Interactive Colors
  interactive: '#00BFFF',    // Light blue for interactive elements
  interactiveHover: '#0099CC', // Darker blue for hover states
  interactiveDisabled: '#9CA3AF', // Grey for disabled states
  
  // Border Colors
  border: '#E5E7EB',        // Light grey borders
  borderFocus: '#00BFFF',   // Light blue for focused elements
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const Typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Layout = {
  // Screen padding
  screenPadding: Spacing.xl,
  
  // Card padding
  cardPadding: Spacing.xl,
  
  // Button padding
  buttonPadding: {
    sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
    md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
    lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl },
  },
  
  // Input padding
  inputPadding: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
};

// Common Styles
export const CommonStyles = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Layout.cardPadding,
    ...Shadows.md,
  },
  
  // Button styles
  button: {
    borderRadius: BorderRadius.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...Layout.buttonPadding.md,
  },
  
  buttonPrimary: {
    backgroundColor: Colors.interactive,
  },
  
  buttonSecondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.interactive,
  },
  
  buttonDisabled: {
    backgroundColor: Colors.interactiveDisabled,
  },
  
  // Input styles
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    ...Layout.inputPadding,
  },
  
  inputFocused: {
    borderColor: Colors.borderFocus,
  },
  
  // Text styles
  textPrimary: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.normal,
  },
  
  textSecondary: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
  },
  
  textHeading: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
  },
  
  textSubheading: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
  },
  
  // Header styles
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Layout.screenPadding,
    alignItems: 'center' as const,
  },
  
  headerTitle: {
    color: Colors.accent,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing.sm,
  },
  
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.base,
    textAlign: 'center' as const,
  },
  
  // Logo styles
  logo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.lg,
  },
  
  logoText: {
    color: Colors.accent,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing.sm,
  },
  
  logoSubtext: {
    color: Colors.secondary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.md,
  },
  
  logoTagline: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
  CommonStyles,
};
