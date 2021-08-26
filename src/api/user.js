import request from '@/utils/request'

export function login (params) {
  return request({
    url: '/login',
    method: 'POST',
    data: params
  })
}
