import { api } from './api'
import { LoginRes } from '../model/sys.model'

export const loginAsync = async (username: string, password: string) => {
  return api.post<LoginRes>('auth/login', {
    username: username,
    password: password,
  })
}

interface RentParams {
  pageNo: number
  pageSize: number
  building?: string
  roomNoStr?: string
}

/**
 * 获取租金列表
 */
export const getRentList = async (rentParams: RentParams) => {
  return api.post('rentList/list', rentParams)
}
