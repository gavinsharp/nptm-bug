const withPlugins = require('next-compose-plugins');

const withSass = require('@zeit/next-sass');
const withTM = require('next-plugin-transpile-modules');

module.exports = withPlugins([
  withTM({
    transpileModules: ['empty'],
  }),
  withSass,
], {
  webpack: (config, { dev }) => {
    throw "custom webpack config";
  },
});
