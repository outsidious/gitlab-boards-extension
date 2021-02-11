module.exports = {
  runtimeCompiler: true,
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries:
          {
              'gitlab-script': 'src/content-scripts/gitlab-script.js',
              'restruct-card': 'src/content-scripts/restruct-card.js'
          }
        }
      }
    }
  }
}
