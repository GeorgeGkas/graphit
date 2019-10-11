import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './providers/Auth'
import * as serviceWorker from './services/serviceWorker'
import FirebaseProvider from './providers/Firebase'
import GlobalStyle from './styles.global'
import configureReduxStore from './services/configureStore'
import Router from './Router'

const { store } = configureReduxStore()

ReactDOM.render(
  <ReduxProvider store={store}>
    <FirebaseProvider>
      <AuthProvider>
        <CssBaseline />
        <GlobalStyle />
        <ToastContainer
          closeOnClick
          hideProgressBar
          autoClose={false}
          closeButton={false}
          pauseOnHover={false}
        />
        <Router />
      </AuthProvider>
    </FirebaseProvider>
  </ReduxProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()