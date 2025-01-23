import { generateState } from 'arctic'
import { github } from '~~/server/utils/services/auth/oauth'

export default defineEventHandler(async (event) => {
  const state = generateState()
  const config = useRuntimeConfig()
  const url = github.createAuthorizationURL(state, [`user:email`])

  setCookie(event, `github_oauth_state`, state, {
    path: `/`,
    secure: config.env === `production`,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: `lax`,
  })

  return sendRedirect(event, url.toString(), 302)
})
