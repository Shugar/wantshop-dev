module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/vendor.js': /^(?!app)/,
        'javascripts/app.js': /^app/
      }
    },
    stylesheets: { joinTo: 'stylesheets/app.css' }
  },

  plugins: {
    babel: {
      presets: ['env']
    },

    static: {
      processors: [
        require('html-brunch-static')({
          processors: [
            require('pug-brunch-static')({
              fileTransform: (filename) => filename.replace(/static\.pug$/, 'html')
            })
          ],
          minify: true
        })
      ]
    },

    postcss: {
      processors: [
        require('autoprefixer')(['> 1%', 'last 8 versions', 'ie 9']),
        require('postcss-flexbugs-fixes'),
        require('postcss-flexibility')
      ]
    }
  }
};
