const withPWA = require('next-pwa')({
  dest: 'public'
})

const withTM = require('next-transpile-modules')(['react-hichestan-datetimepicker']);

module.exports = withTM(withPWA({
  reactStrictMode: true, 
  devIndicators: {
  buildActivity: false
}
}))
