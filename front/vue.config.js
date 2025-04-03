module.exports = {
  webpack: {
    configure: {
      resolve: {
        alias: {
          '@': require('path').resolve(__dirname, 'front/src')
        }
      }
    }
  }
};
