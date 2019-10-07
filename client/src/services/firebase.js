import app from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
}

/**
 * Singleton class for initializing Firebase app only once.
 */
export default class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.googleProvider = new app.auth.GoogleAuthProvider()
  }

  signIn = () => this.auth.signInWithPopup(this.googleProvider)
  signOut = () => this.auth.signOut()
}
