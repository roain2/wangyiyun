import request from './request'

//获取MV
export const mvApi = (area: string, type: string, order: string,
  offset: number, limit: number) => {
  return request({
    url: `/mv/all?area=${area}&type=${type}&order=${order}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}

// 获取MV详情信息
export const mvDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/mv/detail?mvid=${id}`,
    method: 'get'
  })
}

// 获取MV URL
export const mvUrlApi = (id: number | string | string[]) => {
  return request({
    url: `/mv/url?id=${id}`,
    method: 'get'
  })
}

// 获取相似mv
export const reletedMvApi = (id: number | string | string[]) => {
  return request({
    url: `/simi/mv?mvid=${id}`,
    method: 'get'
  })
}

