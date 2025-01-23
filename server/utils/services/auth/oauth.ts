import { GitHub, Google } from 'arctic'

const config = useRuntimeConfig()

const github = new GitHub(config.githubClientId, config.githubClientSecret, null)
const google = new Google(config.googleClientId, config.googleClientSecret, config.googleRedirectUri)

export {
  github,
  google,
}
