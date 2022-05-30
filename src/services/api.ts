import type { App } from 'vue'
import { message } from 'ant-design-vue'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import router from '@/router'

/**
 * @desc: 异常拦截处理器
 * @param { Object } error 错误信息
 */
const errorHandler = (error: AxiosError): AxiosError | Promise<AxiosError> => {
  message.error(error.message)
  return Promise.reject(error)
}

/**
 * 创建axios实例
 */
export const api = axios.create({
  baseURL: 'http://127.0.0.1:9999/house',
  // 指定请求超时的毫秒数,目前 10 秒
  timeout: 10 * 1000,
})

/* 在每个请求上添加 token */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token && config.url != 'auth/login') {
    if (!config.headers) config.headers = {}
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
}, errorHandler)

/**
 * @desc: 服务端响应后拦截
 * @param { Object } response 返回的数据
 */
api.interceptors.response.use((response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
  const res = response.data
  // console.log('xxx' + JSON.stringify(res))
  if (res.code === 0) {
    // 存在分页的情况会返回整个 res
    return res
  } else if (res.code === 401) {
    // 登录失效
    localStorage.remove('token')
    router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
    return Promise.reject(response)
  } else {
    message.error(res.msg)
    return Promise.reject(response)
  }
}, errorHandler)

export default api
