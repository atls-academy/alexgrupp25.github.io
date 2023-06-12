import { LoggedUser } from './interfaces'

export const checkNoActiveSession = async (userStatusObj: LoggedUser): Promise<void> => {
  if (!userStatusObj.isLoggedIn) {
    throw new Error('No active user')
  }
}

export const checkActiveSession = async (userStatusObj: LoggedUser): Promise<void> => {
  if (userStatusObj.isLoggedIn) {
    throw new Error('You have an active session')
  }
}
