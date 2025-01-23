import { deleteSessionTokenCookie, invalidateSession } from '~~/server/utils/services/auth/session'

export default defineEventHandler(async (event) => {
  if (!event.context.session) {
    throw createError({
      statusCode: 403,
    })
  }
  await invalidateSession(event.context.session.id)
  deleteSessionTokenCookie(event)
  sendRedirect(event, `/`)
})
