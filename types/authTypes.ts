export interface UserSession {
  user?: User | null
  session?: Session | null
}

export interface User {
  id: number
  email: string
  username: string
  emailVerified: boolean
  registered2FA: boolean
}

export interface SessionFlags {
  twoFactorVerified?: boolean
}

export interface Session extends SessionFlags {
  id: string
  expiresAt: Date
  userId: number
}

export type SessionValidationResult =
  | { session: Session, user: User }
  | { session: null, user: null }

export interface UserSessionComposable {
  /**
   * Computed indicating if the auth session is ready
   */
  ready: ComputedRef<boolean>
  /**
   * Computed indicating if the user is logged in.
   */
  loggedIn: ComputedRef<boolean>
  /**
   * The user object if logged in, null otherwise.
   */
  user: ComputedRef<User | null>
  /**
   * The session object.
   */
  session: Ref<UserSession>
  /**
   * Fetch the user session from the server.
   */
  fetch: () => Promise<void>
  /**
   * Clear the user session and remove the session cookie.
   */
  clear: () => Promise<void>
}

declare module 'h3' {
  interface H3EventContext {
    user: User | null
    session: Session | null
  }
}

