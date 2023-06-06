import request from './request'

// 轮播图的数据
export const bannerApi = () => {
  return request({ url: `/banner?type=0`, method: 'GET' })
}

// 推荐歌单的数据
export const personalizedApi = () => {
  return request({ url: `/personalized?limit=15`, method: 'GET' })
}

// 歌单标签列表
export const playlistTagApi = () => {
  return request({ url: `/playlist/catlist`, method: 'GET' })
}

// 热门歌单分类
export const hotTagApi = () => {
  return request({ url: `/playlist/hot`, method: 'GET' })
}

//根据分类和分页获取歌单（网友精选碟）
export const handpickApi = (tag: string, currentPage: number) => {
  return request({
    url: `/top/playlist?cat=${tag}&offset=${currentPage * 25}&limit=25`,
    method: 'GET',
  })
}


// 所有榜单
export const toplistApi = () => {
  return request({
    url: `/toplist/detail`,
    method: 'GET',
  })
}

//根据分类获取歌手
export const singerlistApi = (area: number, type: number, initial: string,
  offset: number, limit: number) => {
  return request({
    url: `/artist/list?&area=${area}&type=${type}&initial=${initial}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}

// 每日推荐 歌单 需要登录
export const dailyStarPlaylistApi = () => {
  return request({
    url: `/recommend/resource`,
    method: 'GET',
  })
}

// 每日推荐 歌曲 需要登录
export const dailyStarSongsApi = () => {
  return request({
    url: `/recommend/songs`,
    method: 'GET',
  })
}


