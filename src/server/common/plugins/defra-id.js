import { getOidcConfig } from '~/src/server/common/plugins/auth/get-oidc-config.js'
import { config } from '~/src/config/config.js'
import { openIdProvider } from '~/src/server/common/plugins/auth/open-id.js'
import { routes } from '~/src/server/common/constants/routes.js'
import { validateUserSession } from '~/src/server/common/plugins/auth/validate.js'

export const defraId = {
  plugin: {
    name: 'auth',
    register: async (server) => {
      const { authEnabled } = config.get('defraId')

      if (!authEnabled) {
        server.auth.strategy('defra-id', 'basic', {
          validate: () => ({ isValid: true })
        })
        return
      }

      const oidcConfig = await getOidcConfig()
      const defra = openIdProvider('defraId', oidcConfig)
      const { cookie } = config.get('session')
      const { clientId, clientSecret, serviceId, redirectUrl } =
        config.get('defraId')

      server.auth.strategy('defra-id', 'bell', {
        location: (request) => {
          request.yar.flash('referrer', routes.PROJECT_NAME)
          return `${redirectUrl}${routes.AUTH_DEFRA_ID_CALLBACK}`
        },
        provider: defra,
        password: cookie.password,
        clientId,
        clientSecret,
        isSecure: cookie.secure,
        providerParams: {
          serviceId
        }
      })

      server.auth.strategy('session', 'cookie', {
        cookie: {
          path: '/',
          password: cookie.password,
          isSecure: cookie.secure,
          ttl: cookie.ttl
        },
        keepAlive: true,
        redirectTo: () => {
          return `/login`
        },
        validate: async (request, session) => {
          return validateUserSession(request, session)
        }
      })

      server.auth.default('session')
    }
  }
}
