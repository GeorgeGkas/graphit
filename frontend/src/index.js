import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import * as serviceWorker from './services/serviceWorker'
import App from './scenes/App'
import Dashboard from './scenes/Dashboard'
import GlobalStyle from './styles.global'
import configureReduxStore from './services/configureStore'
import Page404 from './scenes/Page404'
import PrivateRoute from './organisms/PrivateRoute'

const store = configureReduxStore()

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <GlobalStyle />
    <ToastContainer
      closeOnClick
      hideProgressBar
      autoClose={false}
      closeButton={false}
      pauseOnHover={false}
    />
    <Router>
      <Switch>
        <Route component={App} path="/app" />
        <Redirect exact from="/" to="/app" />
        <PrivateRoute component={Dashboard} fallback="/app" path="/dashboard" />
        <Route component={Page404} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
