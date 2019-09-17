const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");

module.exports = withCSS(
  withTypescript({
    cssModules: true,
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  })
);
