import request from './request'

//获取用户详细
export const userDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/user/detail?uid=${id}`,
    method: 'GET',
  })
}

//获取用户歌单
export const userPlaylistApi = (id: number | string | string[]) => {
  return request({
    url: `/user/playlist?uid=${id}`,
    method: 'GET',
  })
}

// 获取用户关注列表
export const userFollowsApi = (id: number | string | string[]) => {
  return request({
    url: `/user/follows?uid=${id}&limit=99`,
    method: 'GET',
  })
}

// 获取用户粉丝列表
export const userFollowedsApi = (id: number | string | string[]) => {
  return request({
    url: `/user/followeds?uid=${id}&limit=99`,
    method: 'GET',
  })
}
