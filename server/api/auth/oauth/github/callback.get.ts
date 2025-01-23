import type { OAuth2Tokens } from 'arctic'
import type { User } from '~~/types/authTypes'
import { ArcticFetchError, OAuth2RequestError } from 'arctic'
import { createOAuthUser, getOAuthUser } from '~~/server/utils/repositories/user'
import { github } from '~~/server/utils/services/auth/oauth'
import { globalGETRateLimit } from '~~/server/utils/services/auth/request'
import { createOAuthSession, generateSessionToken, setSessionTokenCookie } from '~~/server/utils/services/auth/session'

export default defineEventHandler(async (event) => {
  if (globalGETRateLimit(event)) {
    throw createError({
      status: 429,
      message: `Too many requests`,
    })
  }

  const query = getQuery(event)
  const code = query.code?.toString() ?? null
  const state = query.state?.toString() ?? null
  const storedState = getCookie(event, `github_oauth_state`) ?? null
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    })
  }

  let tokens: OAuth2Tokens | null = null
  let accesToken: string | null = null
  try {
    tokens = await github.validateAuthorizationCode(code)
    accesToken = tokens?.accessToken()
  }
  catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw createError({
        status: 400,
        message: `Please restart the login process`,
      })
		}
  }

  const githubUser = await $fetch<GitHubUser>(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  })

  const existingUser = await getOAuthUser(githubUser.id.toString())

	if (existingUser) {
    const sessionToken = generateSessionToken()
    const session = await createOAuthSession(sessionToken, existingUser.id)
    setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt))
    return sendRedirect(event, `/`, 302)
  }

  let emailListResponse: GithubEmail[] | null = null

  try {
    emailListResponse = await $fetch<GithubEmail[]>(`https://api.github.com/user/emails`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    })
  }
	catch (error) {
    if (error instanceof ArcticFetchError) {
      throw createError({
        status: 400,
        message: `Please restart the login process`,
      })
    }
  }

  if (!Array.isArray(emailListResponse) || emailListResponse.length < 1) {
    throw createError({
      status: 400,
      message: `Please restart the process due to missing email data.`,
    })
  }

  let email: string | null = null

  for (const emailRecord of emailListResponse) {
    const primaryEmail = emailRecord.primary
    const verifiedEmail = emailRecord.verified
    if (primaryEmail && verifiedEmail) {
      email = emailRecord.email
      break
    }
  }

  if (email === null) {
    throw createError({
      status: 400,
      fatal: true,
      message: `Please verify your GitHub email address.`,
    })
  }

  let user: User | null = null
  try {
    user = await createOAuthUser(`github`, githubUser.id.toString(), githubUser.login, email)
    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to create user',
			})
    }
  }
  catch (e) {
    throw createError({
      status: 400,
      message: (e instanceof Error ? e.message : `Unknown error`),
    })
  }

  const token = generateSessionToken()
  const session = await createOAuthSession(token, user.id)
  setSessionTokenCookie(event, token, new Date(session.expiresAt))
  return sendRedirect(event, `/`, 302)
})

interface GitHubUser {
  id: number
  login: string
}

interface GithubEmail {
  email: string
  primary: boolean
  verified: boolean
}
