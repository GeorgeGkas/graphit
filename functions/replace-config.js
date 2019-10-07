/**
 * Replace various config values in built files.
 */

const path = require('path')
const fs = require('fs')

/**
 * Replace variables in lib/config/serviceAccountKey.js
 */
const toReplaceConfig = {
  $FIREBASE_AUTH_PROVIDER_x509_CERT_URL$:
    process.env.FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
  $FIREBASE_AUTH_URI$: process.env.FIREBASE_AUTH_URI,
  $FIREBASE_CLIENT_EMAIL$: process.env.FIREBASE_CLIENT_EMAIL,
  $FIREBASE_CLIENT_ID$: process.env.FIREBASE_CLIENT_ID,
  $FIREBASE_CLIENT_x509_CERT_URL$: process.env.FIREBASE_CLIENT_x509_CERT_URL,
  $FIREBASE_PRIVATE_KEY$: process.env.FIREBASE_PRIVATE_KEY,
  $FIREBASE_PRIVATE_KEY_ID$: process.env.FIREBASE_PRIVATE_KEY_ID,
  $FIREBASE_PROJECT_ID$: process.env.FIREBASE_PROJECT_ID,
  $FIREBASE_TOKEN_URI$: process.env.FIREBASE_TOKEN_URI,
  $FIREBASE_TYPE$: process.env.FIREBASE_TYPE,
}

const configPath = path.join(__dirname, 'lib', 'config', 'serviceAccountKey.js')
const config = fs.readFileSync(configPath, 'utf8')
const newConfig = Object.entries(toReplaceConfig).reduce(
  (oldConfig, [key, value]) => oldConfig.replace(key, value),
  config,
)

fs.unlinkSync(configPath)
fs.writeFileSync(configPath, newConfig)

/**
 * Replace variables in lib/setup/db.js
 */
const toReplaceDb = {
  $FIREBASE_DATABASE_URL$: process.env.FIREBASE_DATABASE_URL,
}

const dbPath = path.join(__dirname, 'lib', 'setup', 'db.js')
const db = fs.readFileSync(dbPath, 'utf8')
const newDb = Object.entries(toReplaceDb).reduce(
  (oldDb, [key, value]) => oldDb.replace(key, value),
  db,
)

fs.unlinkSync(dbPath)
fs.writeFileSync(dbPath, newDb)
