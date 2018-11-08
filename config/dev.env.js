'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"', 
  CLIENT_ID: 'f61a3dd3-a38f-4336-89d3-38e64b4ae697',
  CLIENT_SECRET: 'bc0eef63-a5ef-4cec-8e2d-3636016ffb9f',
  REDIRECT_URI: 'http://localhost:8080/callback',
  ROOT_API: 'http://localhost:3000',
})
