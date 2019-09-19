/**
 * Environmental variables for development purposes.
 */

export default {
  /**
   * DO NOT change `config_type` value.
   */
  config_type: 'production',

  db: process.env.MONGO_URI || 'mongodb://localhost:27017/dijkstra-visualizer-production',
  
  /**
   * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
   */
  debug_level: 0, // All
  
  server: {
    port: process.env.PORT || 8000,
  },
}
