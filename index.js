/**
 * Load environmental variables.
 */

const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const fs = require('fs')
const path = require('path')

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'

const localEnvExist = fs.existsSync(
  path.join(__dirname, 'config', envFile + '.local'),
)

dotenvExpand(
  dotenv.config({
    path: localEnvExist
      ? path.join(__dirname, 'config', envFile + '.local')
      : path.join(__dirname, '..', '..', 'config', envFile + '.local'),
  }),
)
