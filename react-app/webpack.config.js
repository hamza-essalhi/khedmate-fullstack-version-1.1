const path = require('path');

module.exports = {
  entry: './src/index.js',  // Specify the entry point of your application.
  output: {
    path: path.resolve(__dirname, 'dist'),  // Specify the output directory for bundled files.
    filename: 'bundle.js',  // Specify the name of the output bundle.
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  },
  module: {
    rules: [
      // Add any necessary loaders and rules for your project.
    ],
  },
};
