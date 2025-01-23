export default defineEventHandler((event) => {
  return {
    session: event.context.session,
    user: event.context.user,
  }
})
