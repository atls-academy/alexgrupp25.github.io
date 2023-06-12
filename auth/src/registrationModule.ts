/* eslint no-console: 0 */ // --> off console.log errors

import * as bcrypt  from 'bcryptjs'

import { User }     from './interfaces'
import { authFunc } from './index'

export const createUser = async (userName: string, password: string): Promise<User> => {
  if (userName.length < 5) {
    throw new Error('Username must be at least 5 characters')
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }
  if (authFunc.credentials.some((user) => user.userName === userName)) {
    throw new Error('This username already exists')
  }
  if (!userName || userName.trim() === '') {
    throw new Error('User name is required')
  }
  if (!password || password.trim() === '') {
    throw new Error('Password is required')
  }

  const hashedPassword: string = await bcrypt.hash(password, 10)

  const regUser: User = { userName, password: hashedPassword }
  return regUser
}

export const registerUser = async (user: User): Promise<void> =>
  new Promise((resolve) => {
    authFunc.credentials.push(user)
    console.log(`User with nickname "${user.userName}" was created`)
    resolve()
  })
