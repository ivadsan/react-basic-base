const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname)

  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env'

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.NODE_ENV

  console.log(envPath)
  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath

  console.log(finalPath)
  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
    return prev
  }, {})

  return {
    output: {
      filename: 'js/app.bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'your title',
        template: 'public/index.html'
      }),

      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css'
      }),
      new DefinePlugin(envKeys)
      // new Dotenv()

    ],
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.(s*)css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[hash].[ext]',
              outputPath: 'assets'
            }
          }
        }
      ]
    }
  }
}
