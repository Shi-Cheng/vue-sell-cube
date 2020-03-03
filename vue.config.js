const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          data: seller,
          errno: 0
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          data: goods,
          errno: 0
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          data: ratings,
          errno: 0
        })
      })
    }
  }
}
