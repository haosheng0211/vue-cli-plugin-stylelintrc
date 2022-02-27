const fs = require('fs')

const path = require('path')

module.exports = (api, options, rootOptions) => {
  const templatePath = path.resolve(__dirname, './template/_stylelintrc')

  if (fs.existsSync(templatePath) && !fs.existsSync(api.resolve('.stylelintrc'))) {
    api.render('./template')
  }

  api.extendPackage({
    devDependencies: {
      'postcss-html': '^1.3.0',
      stylelint: '>=14.0.0',
    },
    scripts: {
      'lint:style': 'stylelint "**/*.{css,scss,sass,html,vue}" --ignore-path .gitignore',
    },
  })
}
