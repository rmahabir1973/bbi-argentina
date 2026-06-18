import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // BBI Argentina design tokens
        brand: {
          ink: '#1A1A1A',        // Primary text — near-black
          earth: '#2D2A26',      // Deep soil — headings on light
          olive: '#4A5240',      // Productive land — accent primary
          sage: '#6B7A5E',       // Advisory tone — accent secondary
          straw: '#C8B97A',      // Harvest gold — highlight / CTA
          limestone: '#F5F2EB',  // Off-white — page background
          slate: '#E8E4DC',      // Light grey — section dividers
          fog: '#F0EDE7',        // Card backgrounds
          water: '#3A5F7A',      // Water rights indicator — accessible blue
          verified: '#2E6B3E',   // Verified / operational status — green
          partial: '#8B6914',    // Partial development status — amber
          raw: '#6B5B45',        // Raw land status — warm brown
          offmarket: '#5A5A5A',  // Off-market / sold — neutral grey
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid type scale
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      },
      spacing: {
        'section': '5rem',       // 80px — section vertical padding
        'section-sm': '3rem',    // 48px — tighter sections
        'container': '1280px',   // Max content width
      },
      maxWidth: {
        'content': '1280px',
        'prose': '72ch',
        'narrow': '56ch',
      },
      borderRadius: {
        'tag': '2px',
        'card': '4px',
        'button': '2px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26,26,26,0.08), 0 1px 2px rgba(26,26,26,0.06)',
        'card-hover': '0 4px 12px rgba(26,26,26,0.12), 0 2px 6px rgba(26,26,26,0.08)',
        'callout': '0 0 0 1px rgba(26,26,26,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', maxHeight: '0' },
          '100%': { opacity: '1', maxHeight: '500px' },
        },
      },
      // Minimum tap target for WCAG 2.1 AA
      minHeight: {
        'tap': '44px',
      },
      minWidth: {
        'tap': '44px',
      },
    },
  },
  plugins: [typography],
}

export default config
