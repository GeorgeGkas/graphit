import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './styles.global'
import App from './scenes/App'
import * as serviceWorker from './services/serviceWorker'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import configureReduxStore from './services/configureStore'

const store = configureReduxStore()

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
