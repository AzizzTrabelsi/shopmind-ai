export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Arabic"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace']
      },
      colors: {
        bg: 'var(--bg)', surface: 'var(--surface)', surface2: 'var(--surface2)',
        line: 'var(--line)', ink: 'var(--ink)', mute: 'var(--mute)',
        brand: 'var(--brand)', brandInk: 'var(--brand-ink)', warn: 'var(--warn)', bad: 'var(--bad)'
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } }
      },
      animation: { shimmer: 'shimmer 2.4s linear infinite', float: 'float 6s ease-in-out infinite' }
    }
  }
}
