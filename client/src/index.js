import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import i18n from './i18n'
import AuthProvider from './providers/Auth'
import FirebaseProvider from './providers/Firebase'
import Router from './Router'
import configureReduxStore from './services/configureStore'
import * as serviceWorker from './services/serviceWorker'
import GlobalStyle from './styles.global'

const { store } = configureReduxStore()

i18n()
  .then(() =>
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
    ),
  )
  .then(() => {
    setTimeout(() => {
      window.cookieconsent.initialise({
        palette: {
          popup: {
            background: '#252e39',
          },
          button: {
            background: 'transparent',
            text: '#14a7d0',
            border: '#14a7d0',
          },
        },
        position: 'top',
      })
    }, 500)
  })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
