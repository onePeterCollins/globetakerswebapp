module.exports = {
    pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.json$/,
        /\.map$/,
        /\.js.map$/
      ]
    }
  }
}
