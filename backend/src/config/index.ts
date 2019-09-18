/**
 * Global configuration file.
 */

import auth from './auth'
import dev from './dev'
import production from './production';

const config = {
  dev: { ...dev, auth },
  production: { ...production, auth }
}

// @ts-ignore
export default config[process.env.NODE_ENV || 'dev']
