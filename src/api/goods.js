import request from '@/utils/request'

export function category (params) {
  return request({
    url: '/goods/category',
    method: 'GET',
    params: params
  })
}

export function tableList (params) {
  return request({
    url: '/goods/table',
    method: 'GET',
    params: params
  })
}

export function goodsInfo (params) {
  return request({
    url: '/goods/info',
    method: 'GET',
    params: params
  })
}
