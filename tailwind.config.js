module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.vue'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '2rem',
    },
  },
  variants: {},
  plugins: [],
};
