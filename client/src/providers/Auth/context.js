import axios from 'axios'
import React from 'react'

import { withFirebase } from '../Firebase'

/**
 * Encapsulate auth mechanism in its own context.
 * This way we do not mess with the global state
 * and better track our dependencies.
 */
const AuthContext = React.createContext(null)

const AuthProvider = withFirebase(props => {
  const [authUser, setAuthUser] = React.useState(null)

  const requestAuthUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/user`,
        {
          withCredentials: true,
        },
      )

      setAuthUser(res.status === 200 ? { ...res.data.data } : null)
    } catch (e) {
      setAuthUser(null)
    }

    return authUser
  }

  const requestSessionCookieFromIdToken = async token => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/signin`,
        {
          token,
        },
        {
          withCredentials: true,
        },
      )

      return res.status === 200
    } catch (e) {
      return false
    }
  }

  const revokeSessionCookie = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/signout`,
        null,
        {
          withCredentials: true,
        },
      )

      return res.status === 204
    } catch (e) {
      return false
    }
  }

  const signIn = async () => {
    await props.firebase.signIn()
    const token = await props.firebase.auth.currentUser.getIdToken()

    setAuthUser({
      email: props.firebase.auth.currentUser.email,
      imageUrl: props.firebase.auth.currentUser.photoURL,
      name: props.firebase.auth.currentUser.displayName,
      token,
      uid: props.firebase.auth.currentUser.uid,
    })

    const cookieIsSet = await requestSessionCookieFromIdToken(token)

    if (!cookieIsSet) {
      throw new Error('Could not set session cookie.')
    }

    await props.firebase.signOut()
  }

  const signOut = async () => {
    setAuthUser(null)
    const cookieIsUnset = await revokeSessionCookie()

    if (!cookieIsUnset) {
      throw new Error('Could not unset session cookie.')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        requestAuthUser,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
})

/**
 * Pass Auth class instance to components.
 */
const withAuthentication = Component => props => (
  <AuthContext.Consumer>
    {auth => <Component {...props} auth={auth} />}
  </AuthContext.Consumer>
)

export { AuthProvider as default, withAuthentication }
