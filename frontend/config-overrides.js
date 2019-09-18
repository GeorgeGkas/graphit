/**
 * Add decorators support to React app.
 */
const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(addDecoratorsLegacy())
