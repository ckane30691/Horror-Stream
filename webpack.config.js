var path = require("path");
var webpack = require("webpack");

var plugins = [
  new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           historyApiFallback: true
         }
       })

]; // if using any plugins for both dev and production
var devPlugins = []; // if using any plugins for development

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
    }
  })
];

plugins = plugins.concat(
  process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
);

module.exports = {
  context: __dirname,
  entry: "./frontend/scripts/entry.jsx",
    output: {
        path: __dirname,
        filename: "./static_pages/bundle.js"
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js', '.jsx', '*']
    },
    module: {
      loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          }
      ]
    },
    devtool: 'source-maps',
};
