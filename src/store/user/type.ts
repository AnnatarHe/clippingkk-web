export const AUTH_LOGIN = 'auth.AUTH_LOGIN'
export const AUTH_LOGIN_ACTION = 'auth.saga.AUTH_LOGIN_ACTION'

export type UserContent = {
    id: number
    name: string
    email: string
    avatar: string
}

export type UserState = {
  profile: UserContent,
  token: string
}

export interface IUserAction {
  type: typeof AUTH_LOGIN,
  payload: UserState
}


export function toLogin(email: string, pwd: string) {
  return {
    type: AUTH_LOGIN_ACTION,
    email, pwd
  }
}

