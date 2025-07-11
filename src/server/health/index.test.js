import { health } from '~/src/server/health/index.js'

describe('health route', () => {
  test('route is registered correctly', () => {
    const server = {
      route: jest.fn()
    }

    health.plugin.register(server)

    expect(server.route).toHaveBeenCalled()
    expect(server.route).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        path: '/health'
      })
    )
  })
})
