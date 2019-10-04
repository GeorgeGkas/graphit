import * as admin from 'firebase-admin'
import serviceAccountKey from '../config/serviceAccountKey'

export function setup () {
  admin.initializeApp({
    // @ts-ignore serviceAccountKey object does not match the
    //            appropriate parameter.
    credential: admin.credential.cert(serviceAccountKey),

    /**
     * ~~! DO NOT EDIT !~~
     * 
     * The value is replaced by the corresponding
     * .env file from /config folder in build time.
     */
    databaseURL: "$FIREBASE_DATABASE_URL$"
  })

  return admin.firestore()
}
