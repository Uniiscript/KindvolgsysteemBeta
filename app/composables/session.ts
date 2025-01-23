import { authConfig } from '~~/shared/authConfig'
import type { UserSession, UserSessionComposable } from '~~/types/authTypes'

export function useUserSession(): UserSessionComposable {
  const sessionState = useState<UserSession>('nuxt-session', () => ({}))
  const authReadyState = useState('nuxt-auth-ready', () => false)

  async function fetch() {
    const data = await useRequestFetch()(authConfig.sessionURL)

    if (data) {
      if (typeof data.session?.expiresAt === `string`) {
        // @ts-expect-error - Convert the payload back to an actual Date object
        data.session.expiresAt = new Date(data.session.expiresAt)
      }

      sessionState.value = data as UserSession
    }

    if (!authReadyState.value) {
      authReadyState.value = true
    }
  }

  async function clear() {
    await $fetch(authConfig.sessionURL, { method: `DELETE` })
    sessionState.value = {}
  }

  return {
    ready: computed(() => authReadyState.value),
    loggedIn: computed(() => Boolean(sessionState.value.user)),
    user: computed(() => sessionState.value.user || null),
    session: sessionState,
    fetch,
    clear,
  }
}
