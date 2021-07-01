module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}', 
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['Roboto mono', 'Courier New', 'monospace'],
    },

    colors: {
      text: {
        DEFAULT: 'var(--color-text)',
        grey: 'var(--color-text-grey)'
      },
      background: {
        light: 'var(--color-bg-light)',
        DEFAULT: 'var(--color-bg)',
      },
      primary: {
        dark: 'var(--color-primary-light)',
        DEFAULT: 'var(--color-primary)',
      }
    },
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.2'
          },
        }
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}