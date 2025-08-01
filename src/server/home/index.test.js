import { home } from '~/src/server/home/index.js'

describe('home route', () => {
  test('route is registered correctly', () => {
    const server = {
      route: jest.fn()
    }

    home.plugin.register(server)

    expect(server.route).toHaveBeenCalled()
    expect(server.route).toHaveBeenCalledWith([
      expect.objectContaining({
        method: 'GET',
        path: '/'
      })
    ])
  })
})
