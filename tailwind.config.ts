import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette from plan.md
        background: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
        },
        accent: {
          neon: '#00ff41',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3',
        },
        border: {
          default: '#333333',
        }
      },
      animation: {
        'typewriter': 'typewriter 2s steps(11) forwards',
        'caret': 'typewriter 2s steps(11) forwards, blink 1s steps(1) infinite 2s',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
        glow: {
          from: {
            textShadow: '0 0 20px #00ff41',
          },
          to: {
            textShadow: '0 0 30px #00ff41, 0 0 40px #00ff41',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config