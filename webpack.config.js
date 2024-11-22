const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your entry JavaScript file
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist') // Folder where bundled files will go
  },
  module: {
    rules: [
      {
        test: /\.html$/,  // To load HTML files using html-loader
        use: 'html-loader'
      },
      {
        test: /\.css$/,   // To load CSS files using style-loader and css-loader
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // This is your main HTML file, it will be injected with the JS bundle
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),  // Serve static files from dist folder
    port: 9000,  // You can change the port here
    hot: true,   // Enable hot module replacement (HMR)
    open: true   // Automatically open the browser when the server starts
  }
};
