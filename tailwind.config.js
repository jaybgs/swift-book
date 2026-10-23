/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Fragment Mono"', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        paper: {
          50: '#fdfdfb',
          100: '#f9f9f6',
          200: '#f4f4ee',
          300: '#eaeae0',
          400: '#dcdccf',
          500: '#c5c5b4',
        },
        obsidian: {
          DEFAULT: '#0a0b0d',
          card: '#12141a',
          surface: '#161820',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(255, 255, 255, 0.04)',
        },
        supa: {
          orange: '#f35921',
          coral: '#ff7a45',
          amber: '#ff9500',
          blue: '#0099ff',
          purple: '#6344f5',
          gold: '#e6a817',
          mint: '#10b981',
          cream: '#eddfd0',
        }
      },
      boxShadow: {
        'bento': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'bento-hover': '0 20px 40px rgba(0, 0, 0, 0.1)',
        'glow-orange': '0 0 35px -5px rgba(243, 89, 33, 0.3)',
        'glow-blue': '0 0 35px -5px rgba(0, 153, 255, 0.3)',
        'glow-card': '0 0 25px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.65 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
