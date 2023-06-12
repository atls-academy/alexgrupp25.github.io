import { authenticateUser }  from '../authorizationModule'
import { setLoggedInStatus } from '../authorizationModule'

jest.mock('../', () => {
  const bcrypt = require('bcryptjs')

  return {
    authFunc: {
      ...jest.requireActual('../').authFunc,
      credentials: [
        { userName: 'JohnDoe', password: bcrypt.hashSync('123456', 10) },
        { userName: 'SarraConnor', password: bcrypt.hashSync('654321', 10) },
      ],
    },
  }
})

describe('authenticateUser', () => {
  it('should return true if userName & password is correct', async () => {
    const result = await authenticateUser('JohnDoe', '123456')
    expect(result).toBe(true)
  })
})

it('should return false if user does not exist', async () => {
  const userName = 'Erling Holland'
  const password = '111222454'
  const result = await authenticateUser(userName, password)
  expect(result).toBe(false)
})

it('should return false if user exists but passwords do not match', async () => {
  const userName = 'Sarra Connor'
  const password = '666666'
  const result = await authenticateUser(userName, password)
  expect(result).toBe(false)
})

describe('setLoggedInStatus', () => {
  it('should set isLoggedIn to true and update userName', async () => {
    const userName = 'user1'
    const userStatusObj = {
      isLoggedIn: false,
      userInfo: { userName: '' },
    }
    await setLoggedInStatus(userName, userStatusObj)
    expect(userStatusObj.isLoggedIn).toBe(true)
    expect(userStatusObj.userInfo.userName).toBe(userName)
  })
})
