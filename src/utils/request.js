import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  withCredentials: false
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (res.data && res.data.length > 0) {
        Message({
          message: res.data[0].defaultMessage || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 40101 需登录后访问 40102 令牌已过期 40103 令牌无效
      if (res.code === 40101 || res.code === 40102 || res.code === 40103) {
        store.dispatch('user/resetToken').then(() => {
          window.setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
      }
      // 40301 无权限
      if (res.code === 40301) {
        window.setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      }
      // return res
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
