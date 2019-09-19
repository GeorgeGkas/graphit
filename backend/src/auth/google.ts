/**
 * Passport Google OAuth 2.0 middleware.
 */

import { AugmentedRequest, UserProfile } from 'express'
import * as passport from 'passport'
import * as GoogleTokenStrategy from 'passport-google-token'
import Author from '../models/author'

export default function registerGoogleAuth() {
  passport.use(
    new GoogleTokenStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      async (
        // tslint:disable-next-line:variable-name
        _accessToken: string,
        // tslint:disable-next-line:variable-name
        _refreshToken: string,
        profile: AugmentedRequest['user'],
        done: (err?: Error | null, profile?: UserProfile | null) => void,
      ) => {
        try {
          await Author.upsertGoogleUser(profile)
          return done(null, profile)
        } catch (err) {
          return done(err, null)
        }
      },
    ),
  )
}
