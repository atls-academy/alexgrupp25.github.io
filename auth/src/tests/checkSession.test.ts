import { checkActiveSession }   from '../checkSessionModule'
import { checkNoActiveSession } from '../checkSessionModule'

describe('checkNoActiveSession', () => {
  it('should throw an error if user is not logged in', async () => {
    const userStatusObj = { isLoggedIn: false, userInfo: { userName: 'JohnDoe' } }

    await expect(checkNoActiveSession(userStatusObj)).rejects.toThrow(Error('No active user'))
  })

  it('should not throw an error if user is logged in', async () => {
    const userStatusObj = { isLoggedIn: true, userInfo: { userName: 'JohnDoe' } }

    await expect(checkNoActiveSession(userStatusObj)).resolves.not.toThrow()
  })
})

describe('checkActiveSession', () => {
  it('should throw an error if user is logged in', async () => {
    const userStatusObj = { isLoggedIn: true, userInfo: { userName: 'JohnDoe' } }
    await expect(checkActiveSession(userStatusObj)).rejects.toThrow(
      Error('You have an active session')
    )
  })

  it('should not throw an error if user is not logged in', () => {
    const userStatusObj = { isLoggedIn: false, userInfo: { userName: 'JohnDoe' } }

    expect(checkActiveSession(userStatusObj)).resolves.not.toThrow()
  })
})
