import request from './request'

//获取专辑详细
export const albumDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/album?id=${id}`,
    method: 'GET',
  })
}