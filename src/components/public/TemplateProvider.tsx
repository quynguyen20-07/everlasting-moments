import { createContext, useContext, useMemo, ReactNode } from 'react';
import type { ThemeSettings } from '@/types/graphql';
import {
  weddingTemplates,
  getPatternSVG,
  getThemeById,
  getLayoutById,
  createWeddingTemplate,
  TEMPLATES_THEME_LIST,
  TEMPLATE_LAYOUTS,
  type WeddingTemplate,
  type TemplateTheme,
  type TemplateLayout,
} from '@/lib/templates/wedding-templates';

interface TemplateContextType {
  template: WeddingTemplate;
  theme: TemplateTheme;
  layout: TemplateLayout;
  cssVars: React.CSSProperties;
  patternUrl: string;
  isDark: boolean;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}

interface TemplateProviderProps {
  themeSettings?: ThemeSettings | null;
  children: ReactNode;
}

// Match theme settings to template
function findMatchingTemplate(themeSettings?: ThemeSettings | null): {
  template: WeddingTemplate;
  theme: TemplateTheme;
  layout: TemplateLayout;
} {
  // Default layout and theme
  const defaultLayout = TEMPLATE_LAYOUTS[0];
  const defaultTheme = TEMPLATES_THEME_LIST[0];
  
  if (!themeSettings) {
    return {
      template: weddingTemplates[0],
      theme: defaultTheme,
      layout: defaultLayout,
    };
  }

  // Try to find theme by template ID (theme ID in legacy system)
  const templateId = themeSettings.template;
  const theme = getThemeById(templateId) || defaultTheme;
  
  // For layout, try to match by primary color style hints or default
  const primaryColor = themeSettings.primaryColor?.toLowerCase();
  let layout = defaultLayout;
  
  if (primaryColor?.includes('pink') || primaryColor?.includes('rose') || primaryColor?.includes('blush')) {
    layout = getLayoutById('romantic-garden') || defaultLayout;
  } else if (primaryColor?.includes('green') || primaryColor?.includes('sage') || primaryColor?.includes('olive')) {
    layout = getLayoutById('rustic-charm') || defaultLayout;
  } else if (primaryColor?.includes('navy') || primaryColor?.includes('dark') || primaryColor?.includes('midnight')) {
    layout = getLayoutById('luxury-royal') || defaultLayout;
  } else if (primaryColor?.includes('white') || primaryColor?.includes('black') || primaryColor?.includes('minimal')) {
    layout = getLayoutById('minimalist-pure') || defaultLayout;
  } else if (primaryColor?.includes('purple') || primaryColor?.includes('lavender') || primaryColor?.includes('violet')) {
    layout = getLayoutById('romantic-garden') || defaultLayout;
  } else if (primaryColor?.includes('modern')) {
    layout = getLayoutById('modern-minimal') || defaultLayout;
  }

  const template = createWeddingTemplate(layout, theme);

  return { template, theme, layout };
}

export function TemplateProvider({ themeSettings, children }: TemplateProviderProps) {
  const { template, theme, layout } = useMemo(
    () => findMatchingTemplate(themeSettings),
    [themeSettings]
  );

  const isDark = useMemo(() => {
    // Check if background is dark (low lightness)
    const bgParts = theme.colors.background.split(' ');
    const lightness = parseFloat(bgParts[2]?.replace('%', '') || '98');
    return lightness < 50 || theme.isDark === true;
  }, [theme]);

  const cssVars = useMemo(() => ({
    '--template-primary': theme.colors.primary,
    '--template-secondary': theme.colors.secondary,
    '--template-background': theme.colors.background,
    '--template-foreground': theme.colors.foreground,
    '--template-accent': theme.colors.accent,
    '--template-muted': theme.colors.muted,
    '--template-card': theme.colors.card,
    '--template-gradient': theme.gradient,
  } as React.CSSProperties), [theme]);

  const patternUrl = useMemo(() => getPatternSVG(theme.pattern), [theme.pattern]);

  return (
    <TemplateContext.Provider value={{ template, theme, layout, cssVars, patternUrl, isDark }}>
      <div
        style={cssVars}
        className={isDark ? 'template-dark' : 'template-light'}
      >
        {children}
      </div>
    </TemplateContext.Provider>
  );
}
