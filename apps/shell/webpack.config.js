const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      // For hosts (please adjust)
      remotes: {
        cart: 'cart@http://localhost:4301/remoteEntry.js',
        products: 'products@http://localhost:4302/remoteEntry.js',
        header: 'header@http://localhost:4303/remoteEntry.js',
        footer: 'footer@http://localhost:4304/remoteEntry.js',
      },
      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "bootstrap": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ],
};
