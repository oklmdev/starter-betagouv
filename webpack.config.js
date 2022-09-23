const glob = require('glob');
const path = require('node:path');
const fs = require('node:fs');
const webpack = require('webpack');

const pageEntries = glob
  .sync('./src/**/*Page.tsx')
  .filter(fileUsesHydration)
  .map((filePath) => {
    return { name: path.basename(filePath, '.tsx'), path: filePath };
  })
  .reduce(
    (entries, { name, path }) => ({
      ...entries,
      [name]: {
        import: path,
        dependOn: 'shared'
      }
    }),
    {}
  );

function fileUsesHydration(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  return fileContents.includes('withBrowserBundle(');
}

if (!pageEntries.length) {
  process.exit(0);
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? 'production' : 'development',
  entry: {
    ...pageEntries,
    shared: ['react', 'react-dom']
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.npm_package_version': JSON.stringify(process.env.npm_package_version)
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: '/node_modules/',
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'js')
  }
};
