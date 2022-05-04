require("dotenv").config()
const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = {
  env: {
    REDIS: process.env.REDIS_URL,
  },
  include: path.resolve(__dirname, 'assets/svg'),
  webpack(config, options) {
    return config
  }
}