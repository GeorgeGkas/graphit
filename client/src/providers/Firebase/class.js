import 'firebase/auth'

import app from 'firebase/app'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
}

export default class Firebase {
  constructor() {
    app.initializeApp(config)

    /**
     * Use custom SESSION implementation with cookies
     * to avoid leaking auth token into local storage.
     *
     * Check Auth provider for more details.
     */
    app.auth().setPersistence(app.auth.Auth.Persistence.NONE)

    this.auth = app.auth()
    this.googleProvider = new app.auth.GoogleAuthProvider()
  }

  signIn = () => this.auth.signInWithPopup(this.googleProvider)
  signOut = () => this.auth.signOut()
}
