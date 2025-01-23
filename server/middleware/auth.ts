import type { Session, User } from '~~/types/authTypes'
import { validateSessionToken } from '~~/server/utils/services/auth/session'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === `GET`) {
    const token = getCookie(event, `session`) ?? null
    if (token !== null) {
      setCookie(event, `session`, token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: `lax`,
        httpOnly: true,
        secure: process.env.NODE_ENV === `production`,
      })
    }
  }

  const originHeader = getHeader(event, `Origin`) ?? null
  const hostHeader = getHeader(event, `Host`) ?? null
  if (!originHeader || !hostHeader || new URL(originHeader).host !== hostHeader) {
    const token = getCookie(event, `session`) ?? null
    if (!token) {
      event.context.session = null
      event.context.user = null
    }

    const { session, user } = token ? await validateSessionToken(token) : { session: null, user: null }
    if (!session) {
      deleteCookie(event, `session`)
      event.context.session = null
      event.context.user = null
    }

    event.context.session = session
    event.context.user = user
  }
})
