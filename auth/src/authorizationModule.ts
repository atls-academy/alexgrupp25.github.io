import bcrypt         from 'bcryptjs'

import { LoggedUser } from './interfaces'
import { authFunc }   from './index'

export const authenticateUser = async (userName: string, password: string): Promise<boolean> => {
  const { credentials } = authFunc
  const foundUser = credentials.find((user) => user.userName === userName)
  if (foundUser) {
    return bcrypt.compare(password, foundUser.password)
  }
  return false
}
export const setLoggedInStatus = async (
  userName: string,
  userStatusObj: LoggedUser
): Promise<void> => {
  const updatedUserStatus = userStatusObj
  updatedUserStatus.isLoggedIn = true
  updatedUserStatus.userInfo.userName = userName
}
