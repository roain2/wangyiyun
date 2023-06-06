import request from './request'

//  获取歌单详情
export const playlistDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: 'GET',
  })
}

// 获取歌曲详情
export const songDetailsApi = (ids: string) => {
  return request({
    url: `/song/detail?ids=${ids}`
  })
}

//收藏歌单
export const playlistSubscribeApi = (id: number) => {
  return request({
    url: `/playlist/subscribe?t=1&id=${id}`,
    method: 'GET',
  })
}

//取消收藏歌单
export const playlistUnsubscribeApi = (id: number) => {
  return request({
    url: `/playlist/subscribe?t=2&id=${id}`,
    method: 'GET',
  })
}
