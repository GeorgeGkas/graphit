/**
 * Redux store configurations.
 * You probably DO NOT want to edit this file.
 * See ./rootReducer.js if you want to apply Redux reducers.
 */

import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from './rootReducer'
import * as rootOperations from './rootOperations'

const rootReducer = createRootReducer()

const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
})

export default (initialState = {}) => {
  /**
   * Redux Configuration.
   */
  const middleware = []
  const enhancers = []

  /**
   * Thunk Middleware.
   */
  middleware.push(thunk)

  /**
   * Axios middleware
   */
  middleware.push(axiosMiddleware(client))

  /**
   * Redux DevTools Configuration
   */
  const actionCreators = {
    ...rootOperations,
  }

  /**
   * If Redux DevTools Extension is installed use it, otherwise use Redux compose.
   */

  /* eslint-disable no-underscore-dangle */
  let composeEnhancers = compose
  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Options: http://extension.remotedev.io/docs/API/Arguments.html
          actionCreators,
        })
      : compose
  }
  /* eslint-enable no-underscore-dangle */

  /**
   * Apply Middleware & Compose Enhancers.
   */
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  /**
   * Create Store
   */
  const store = createStore(rootReducer, initialState, enhancer)

  /**
   * Enable Webpack hot module replacement for reducers
   */
  if (module.hot) {
    module.hot.accept(
      './rootReducer',
      () => store.replaceReducer(require('./rootReducer')), // eslint-disable-line global-require
    )
  }

  return { store }
}
