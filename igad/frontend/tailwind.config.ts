import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IGAD Brand Colors from Figma
        primary: {
          DEFAULT: '#016630',
          light: '#00A63E',
        },
        secondary: '#008236',
        accent: '#155DFC',
        // Surface colors
        background: '#FFFFFF',
        surface: '#FFFFFF',
        // Text colors
        'text-primary': '#101828',
        'text-secondary': '#4A5565',
        'text-muted': '#364153',
        // Border colors
        border: {
          DEFAULT: '#E5E7EB',
          green: '#B9F8CF',
          hero: '#DCFCE7',
        },
        // Background variants
        'bg-green-light': '#DCFCE7',
        'bg-gray-light': '#F3F4F6',
        // Status colors
        success: '#00A63E',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#155DFC',
      },
      fontFamily: {
        sans: ['Arial', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'container': '1248px',
      },
      borderRadius: {
        'card': '14px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
      },
    },
  },
  plugins: [],
}

export default config
