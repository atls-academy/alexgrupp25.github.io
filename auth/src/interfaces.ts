export interface User {
  userName: string
  password: string
}
export interface LoggedUser {
  isLoggedIn: boolean
  userInfo: Partial<User>
}
