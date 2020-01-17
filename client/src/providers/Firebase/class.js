import 'firebase/auth'
import 'firebase/analytics'

import app from 'firebase/app'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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

    /**
     * Initialize Google Analytics.
     */
    this.analytics = app.analytics()

    /**
     * TODO Report users that have disabled cookies and analytics
     */
  }

  signIn = () => this.auth.signInWithPopup(this.googleProvider)
  signOut = () => this.auth.signOut()
}
