import { defineStore } from 'pinia'
import { userDetailsApi, userPlaylistApi } from '@/api/user'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      uid: 0,
      userInfo: { level: '' },
      // 创建的歌单
      createdPlaylist: <any>[],
      // 收藏/订阅(subscrib)的歌单
      subscribedPlaylist: <any>[]
    }
  },
  getters: {

  },
  actions: {
    async getUserData() {
      // 获取信息
      const info: any = await userDetailsApi(this.uid)
      this.userInfo = info.profile
      this.userInfo.level = info.level
      // 获取歌单
      const res: any = await userPlaylistApi(this.uid)
      // 清空之前的歌单
      this.createdPlaylist = []
      this.subscribedPlaylist = []
      // 区分
      res.playlist.forEach((item: any) => {
        // 方便使用CPlaylist组件
        item.picUrl = item.coverImgUrl
        // 不是订阅就是创建，只有这两种类型的歌单
        if (!item.subscribed) {
          this.createdPlaylist.push(item)
        } else {
          this.subscribedPlaylist.push(item)
        }
      })
      console.log(this.createdPlaylist, this.subscribedPlaylist)
    }
  }
})
