import request from './request'

//获取歌手详情
export const singerDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/artist/detail?id=${id}`,
    method: 'get'
  })
}

// 获取歌手热门单曲50首
export const singerHotSongApi = (id: number | string | string[]) => {
  return request({
    url: `/artist/top/song?id=${id}`,
    method: 'get'
  })
}

// 获取歌手专辑 最多30单
export const singerAlbumApi = (id: number | string | string[]) => {
  return request({
    url: `/artist/album?id=${id}`,
    method: 'get'
  })
}

//获取歌手mv
export const singerMVApi = (id: number | string | string[], offset: number, limit: number) => {
  return request({
    url: `/artist/mv?id=${id}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}
