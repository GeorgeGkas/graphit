import * as express from 'express'
import { Dictionary } from 'express-serve-static-core'

/**
 * Extend Express.Request interface with custom properties.
 */
declare module 'express' {
  interface Auth {
    id: string
  }

  interface AuthUser {
    id: string
    _json: {
      name: string
      email: string
      picture: string
      id: string
    }
  }

  interface googleProfile {
    imageUrl: string
    id: string
    name: string
    email: string
  }

  interface UserProfile {
    provider: string
    id: string
    displayName: string
    name: {
      familyName: string
      givenName: string
    }
    emails: Array<{
      value: string
    }>
    raw: string
    _json: {
      name: string
      email: string
      verified_email: boolean
      given_name: string
      family_name: string
      picture: string
      id: string
      locale: string
    }
  }

  interface AugmentedRequest extends express.Request {
    token: string
    auth: Auth
    authToken: Auth
    authUser: AuthUser
    user: UserProfile
  }
}
