const baseAuthPaths = {
  passwordEmail: '_auth/email-password',
  oauth: '/api/auth/oauth',
} as const

export const authConfig = {
  sessionURL: '/api/auth/session',
  passwordSigninURL: `${baseAuthPaths.passwordEmail}/signin`,
  passwordSignupURL: `${baseAuthPaths.passwordEmail}/signup`,
  githubSigninURL: `${baseAuthPaths.oauth}/github`,
  googleSigninURL: `${baseAuthPaths.oauth}/google`,
} as const
