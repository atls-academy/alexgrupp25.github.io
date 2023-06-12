import bcrypt           from 'bcryptjs'

import { authFunc }     from '..'
import { createUser }   from '../registrationModule'
import { registerUser } from '../registrationModule'

describe('createUser', () => {
  it('should create a new user if input is valid', async () => {
    const userName = 'LilitApelsin'
    const password = 'password123'

    const result = await createUser(userName, password)

    expect(result).toEqual({
      userName: 'LilitApelsin',
      password: expect.any(String),
    })
  })

  it('should throw an error if username is less than 5 characters', async () => {
    const userName = 'John'
    const password = 'password123'

    await expect(createUser(userName, password)).rejects.toThrow(
      'Username must be at least 5 characters'
    )
  })

  it('should throw an error if password is less than 6 characters', async () => {
    const userName = 'JohnDoe'
    const password = 'pass'

    await expect(createUser(userName, password)).rejects.toThrow(
      'Password must be at least 6 characters'
    )
  })

  it('should throw an error if username already exists', async () => {
    const userName = 'JohnDoe'
    const password = 'password123'

    authFunc.credentials.push({
      userName: 'JohnDoe',
      password: bcrypt.hashSync('otherpassword', 10),
    })

    await expect(createUser(userName, password)).rejects.toThrow('This username already exists')
  })
})

describe('registerUser', () => {
  it('should log a message with the created user nickname', async () => {
    const user = { userName: 'JohnDoe', password: bcrypt.hashSync('password123', 10) }

    const consoleLogSpy = jest.spyOn(console, 'log')

    await registerUser(user)

    expect(consoleLogSpy).toHaveBeenCalledWith(`User with nickname "${user.userName}" was created`)

    consoleLogSpy.mockRestore()
  })
})
