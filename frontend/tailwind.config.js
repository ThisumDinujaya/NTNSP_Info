/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "hsl(var(--base))",
        surface: "hsl(var(--surface))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        "neon-green": "hsl(var(--neon-green))",
        "navy-dark": "hsl(var(--navy-dark))",
        "navy-medium": "hsl(var(--navy-medium))",
        gold: "hsl(var(--gold))",
        orange: "hsl(var(--orange))",
        "ntnsp-brown": "hsl(var(--ntnsp-brown))",
        "ntnsp-gold": "hsl(var(--ntnsp-gold))",
      },
      boxShadow: {
        soft: "0 12px 40px -20px hsl(var(--primary) / 0.5)",
        glow: "0 0 30px -5px hsl(var(--accent) / 0.4)",
        neon: "0 0 20px -2px hsl(var(--primary) / 0.6)",
        "neon-glow": "0 0 10px rgba(31, 81, 255, 0.4), 0 0 20px rgba(31, 81, 255, 0.2)",
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(31, 81, 255, 0.4), 0 0 20px rgba(31, 81, 255, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(31, 81, 255, 0.6), 0 0 30px rgba(31, 81, 255, 0.3)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
