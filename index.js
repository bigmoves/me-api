// Environment Variables
const dotenv = require('dotenv');
dotenv.config();

require = require('@std/esm')(module);
module.exports = require('./src/server.mjs').default;
