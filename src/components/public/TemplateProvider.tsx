import { createContext, useContext, useMemo, ReactNode } from 'react';
import type { ThemeSettings } from '@/types/graphql';
import {
  weddingTemplates,
  getPatternSVG,
  type WeddingTemplate,
} from '@/lib/templates/wedding-templates';

interface TemplateContextType {
  template: WeddingTemplate;
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
function findMatchingTemplate(themeSettings?: ThemeSettings | null): WeddingTemplate {
  if (!themeSettings) {
    return weddingTemplates[0]; // Default to Golden Elegance
  }

  // Try to match by primary color
  const primaryColor = themeSettings.primaryColor?.toLowerCase();
  
  if (primaryColor?.includes('pink') || primaryColor?.includes('rose') || primaryColor?.includes('blush')) {
    return weddingTemplates.find(t => t.id === 'blush-romance') || weddingTemplates[0];
  }
  if (primaryColor?.includes('green') || primaryColor?.includes('sage') || primaryColor?.includes('olive')) {
    return weddingTemplates.find(t => t.id === 'sage-garden') || weddingTemplates[0];
  }
  if (primaryColor?.includes('navy') || primaryColor?.includes('dark') || primaryColor?.includes('midnight')) {
    return weddingTemplates.find(t => t.id === 'midnight-luxe') || weddingTemplates[0];
  }
  if (primaryColor?.includes('white') || primaryColor?.includes('black') || primaryColor?.includes('minimal')) {
    return weddingTemplates.find(t => t.id === 'pure-minimal') || weddingTemplates[0];
  }
  if (primaryColor?.includes('purple') || primaryColor?.includes('lavender') || primaryColor?.includes('violet')) {
    return weddingTemplates.find(t => t.id === 'lavender-dream') || weddingTemplates[0];
  }

  // Default to Golden Elegance for gold/champagne or any unmatched
  return weddingTemplates[0];
}

export function TemplateProvider({ themeSettings, children }: TemplateProviderProps) {
  const template = useMemo(() => findMatchingTemplate(themeSettings), [themeSettings]);

  const isDark = useMemo(() => {
    // Check if background is dark (low lightness)
    const bgParts = template.colors.background.split(' ');
    const lightness = parseFloat(bgParts[2]?.replace('%', '') || '98');
    return lightness < 50;
  }, [template]);

  const cssVars = useMemo(() => ({
    '--template-primary': template.colors.primary,
    '--template-secondary': template.colors.secondary,
    '--template-background': template.colors.background,
    '--template-foreground': template.colors.foreground,
    '--template-accent': template.colors.accent,
    '--template-muted': template.colors.muted,
    '--template-card': template.colors.card,
    '--template-gradient': template.gradient,
  } as React.CSSProperties), [template]);

  const patternUrl = useMemo(() => getPatternSVG(template.pattern), [template.pattern]);

  return (
    <TemplateContext.Provider value={{ template, cssVars, patternUrl, isDark }}>
      <div
        style={cssVars}
        className={isDark ? 'template-dark' : 'template-light'}
      >
        {children}
      </div>
    </TemplateContext.Provider>
  );
}
