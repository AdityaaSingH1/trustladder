/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces — near-black, not pure black
        ink: {
          950: '#070809',
          900: '#0A0B0D',
          850: '#0E0F13',
          800: '#101216',
          750: '#13151A',
          700: '#16181E',
          650: '#1A1D24',
          600: '#1F2229',
          500: '#262A33',
          400: '#2E333D',
          300: '#3A404C',
          200: '#525967',
          100: '#7C8595',
        },
        // Electric blue — primary actions / active / neutral data
        blue: {
          DEFAULT: '#3B82F6',
          glow: '#60A5FA',
          deep: '#1D4ED8',
          muted: '#1E3A5F',
        },
        // Emerald — positive trend / high trust
        emerald: {
          DEFAULT: '#10B981',
          glow: '#34D399',
          deep: '#047857',
          muted: '#0B3B2E',
        },
        // Violet — secondary highlights / ML references
        violet: {
          DEFAULT: '#8B5CF6',
          glow: '#A78BFA',
          deep: '#6D28D9',
          muted: '#2E1065',
        },
        // Amber — attention states
        amber: {
          DEFAULT: '#F59E0B',
          glow: '#FBBF24',
          muted: '#3F2A0A',
        },
        // Red — reserved for attention only
        red: {
          DEFAULT: '#EF4444',
          glow: '#F87171',
          muted: '#3B1212',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        'small-caps': '0.18em',
      },
      boxShadow: {
        panel: 'inset 0 1px 0 0 rgba(255,255,255,0.03), 0 1px 2px 0 rgba(0,0,0,0.4)',
        'panel-hover': 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 4px 16px 0 rgba(0,0,0,0.5)',
        glow: '0 0 20px -4px rgba(59,130,246,0.4)',
        'glow-emerald': '0 0 20px -4px rgba(16,185,129,0.4)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        'scanlines':
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scan': 'scan 6s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
