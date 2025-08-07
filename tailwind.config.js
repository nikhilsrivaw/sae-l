/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gta': ['Orbitron', 'monospace'],
        'street': ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'gta-black': '#0a0a0a',
        'gta-white': '#f5f5f5',
        'gta-red': '#e63946',
        'gta-yellow': '#f9c74f',
        'gta-purple': '#9d4edd',
        'gta-blue': '#0077b6',
        'neon-green': '#39ff14',
        'neon-pink': '#ff10f0',
        'neon-blue': '#1b03a3',
      },
      backgroundImage: {
        'gradient-gta': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1d 50%, #0a0a0a 100%)',
        'neon-glow': 'linear-gradient(90deg, #39ff14, #ff10f0, #1b03a3)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.8s ease-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}