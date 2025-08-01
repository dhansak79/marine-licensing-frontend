import { activityDescriptionRoutes } from '~/src/server/exemption/activity-description/index.js'
import { routes } from '~/src/server/common/constants/routes.js'

jest.mock('~/src/server/common/helpers/session-cache/utils.js')

describe('activityDescriptionRoutes routes', () => {
  it('GET route is exists and matches route constant', () => {
    expect(activityDescriptionRoutes[0]).toEqual(
      expect.objectContaining({
        method: 'GET',
        path: routes.ACTIVITY_DESCRIPTION
      })
    )
  })

  it('POST route is exists and matches route constant', () => {
    expect(activityDescriptionRoutes[1]).toEqual(
      expect.objectContaining({
        method: 'POST',
        path: routes.ACTIVITY_DESCRIPTION
      })
    )
  })
})
