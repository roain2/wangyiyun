import request from './request'

//获取音频的url
export const songUrlApi = (id: number, level: string = 'higher') => {
  return request({
    url: `/song/url/v1?id=${id}&level=${level}`,
    method: 'GET',
  })
}

// 获取歌曲歌词
export const lyricApi = (id: number) => {
  return request({
    url: `/lyric?id=${id}`,
    method: 'GET'
  })
}