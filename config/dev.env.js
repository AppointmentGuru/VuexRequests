var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost:8000"',
  // APPOINTMENTGURU_API_ROOT: '"https://beta.appointmentguru.co"'
  // APPOINTMENTGURU_API_ROOT: '"http://localhost:8000"'
})
