export default {
  theme: {
    extend: {
      // Endre paletten her. Bruk bg-background, text-foreground,
      // text-muted og border-border direkte i komponentene.
      colors: {
        background: '#f4f1e8',
        foreground: '#263d35',
        muted: '#5e6c63',
        border: '#d6d9ca',
        header: '#20382f',
        cream: '#fffaf0',
        journey: '#293f36',
        accent: '#d6ca9f',
        selection: '#d7c99d',
      },
      spacing: {
        page: 'clamp(1.5rem, 5vw, 6rem)',
        section: 'clamp(1.5rem, 8vw, 9rem)',
        'section-y': 'clamp(5rem, 10vw, 10rem)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
}
