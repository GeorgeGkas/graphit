import React from 'react'

import Firebase from './class'

/**
 * Doing it this way, we can be assured that Firebase is only instantiated once and that it
 * is injected via React’s Context API to React’s component tree. Now, every component that
 * is interested in using Firebase has access to the Firebase instance with a
 * FirebaseContext.Consumer component.
 */
const FirebaseContext = React.createContext(null)

const FirebaseProvider = props => (
  <FirebaseContext.Provider value={new Firebase()}>
    {props.children}
  </FirebaseContext.Provider>
)

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export { FirebaseProvider as default, withFirebase }
