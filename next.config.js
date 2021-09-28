module.exports = {
    webpack: (config, options) => {
      config.module.rules.push(
        // {
        //   test: /.jsx?$/,
        //   loader: 'babel-loader',
        //   exclude: /node_modules/
        // }, {
        //   test: /\.css$/,
        //   loader: "style-loader!css-loader"
        // },
        {
          test: /\.(jpe?g|jpg|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000',
          // use: [
          //   {
          //     loader: 'url-loader',
          //     options: {
          //       limit: 8192
          //     }
          //   }
          // ] 
        }
      )
      return config
    },

}


const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})
// module: {
//   loaders: [{
//     test: /.jsx?$/,
//     loader: 'babel-loader',
//     exclude: /node_modules/
//   }, {
//     test: /\.css$/,
//     loader: "style-loader!css-loader"
//   }, {
//     test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
//     loader: 'url-loader?limit=100000' }]
// },