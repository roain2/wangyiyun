import request from './request'

// 所有评论默认20条

//歌曲评论 
export const songCommentApi = (id: number | string | string[]) => {
  return request({
    url: `/comment/music?id=${id}`,
    method: 'GET',
  })
}

// 歌单评论
export const playlistCommentApi = (id: number | string | string[]) => {
  return request({
    url: `/comment/playlist?id=${id}`,
    method: 'GET',
  })
}

// 专辑评论
export const albumCommentApi = (id: number | string | string[]) => {
  return request({
    url: `/comment/album?id=${id}`,
    method: 'GET',
  })
}

// mv评论
export const mvCommentApi = (id: number | string | string[]) => {
  return request({
    url: `/comment/mv?id=${id}`,
    method: 'GET',
  })
}

// 发表评论
export const releaseCommentApi = (type: number, id: number, content: string) => {
  return request({
    url: `/comment?t=1&type=${type}&id=${id}&content=${content}`,
    method: 'GET'
  })
}

// 删除评论
export const delCommentApi = (type: number, id: number, commentId: number) => {
  return request({
    url: `/comment?t=0&type=${type}&id=${id}&commentId=${commentId}`,
    method: 'GET'
  })
}