const path = require('path')

const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

module.exports = (api, options) => {
  const { lintOnSave, pluginOptions } = options

  if (lintOnSave) {
    api.chainWebpack(config => {
      const { resolveModule } = require('@vue/cli-shared-utils')

      const stylelintOptions = {
        emitError: !(lintOnSave === true || lintOnSave === 'warning'),
        emitWarning: lintOnSave === 'error',
        extensions: ['.css', '.htm', '.html', '.less', '.sass', '.scss', '.sss', '.vue'],
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        formatter: require('stylelint-codeframe-formatter'),
        stylelintPath: path.dirname(resolveModule('stylelint/package.json', api.getCwd()) || resolveModule('stylelint/package.json', __dirname)),
      }

      config.plugin('stylelint').use(StylelintWebpackPlugin, [Object.assign(stylelintOptions, pluginOptions?.stylelint ?? {})])
    })
  }
}
