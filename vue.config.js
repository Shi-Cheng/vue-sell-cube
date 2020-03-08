const path = require('path')
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve (dir) {
  return path.join(__dirname, dir)
}

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
        const id = req.query.id
        res.json({
          data: Object.assign({}, seller, { id }),
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
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  }
}
