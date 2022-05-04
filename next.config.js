require("dotenv").config()
const path = require('path')

module.exports = {
  include: path.resolve(__dirname, 'assets/svg'),
  webpack(config) {
    return config
  }
}
