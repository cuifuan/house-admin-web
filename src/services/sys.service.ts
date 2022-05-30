import { api } from './api'
import { LoginRes } from '../model/sys.model'

export const loginAsync = async (username: string, password: string) => {
  return api.post<LoginRes>('auth/login', {
    userName: username,
    password: password,
  })
}
