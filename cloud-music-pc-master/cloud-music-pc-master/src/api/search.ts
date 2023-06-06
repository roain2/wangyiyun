import request from './request'

//详细搜索
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户
export const searchApi = (keywords: string | string[], type: number, offset: number, limit: number = 30) => {
  return request({
    url: `/cloudsearch?keywords=${keywords}&type=${type}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}

// 热搜
export const hotSearchApi = () => {
  return request({
    url: `/search/hot/detail`,
    method: 'GET'
  })
}