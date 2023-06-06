import { defineStore } from 'pinia'
import { songUrlApi, lyricApi } from '@/api/song'
import { songCommentApi } from '@/api/comment'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      // 播放列表
      playlist: <any>[],
      // 当前播放的音乐下标
      index: 0,
      // 当前正在播放音乐信息
      curSongInfo: {
        // 默认值
        id: 0,
        name: "暂无歌曲",
        al: {
          id: 0,
          name: '',
          picUrl: "https://ts1.cn.mm.bing.net/th/id/R-C.d2f9f4128e684ba537fe9efaf92f1bfd?rik=makKOA%2fy5qn6fA&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2021%2f04-21%2f99518%2fwater_99518_698_698_.png&ehk=c%2bb01RyizJwmfF4speWlE1bpkSRCtyxWZlU%2f6TPecHk%3d&risl=&pid=ImgRaw&r=0",
        },
        ar: [{
          id: 0,
          name: '暂无作者'
        }],
        dt: 0
      },
      // 当前歌曲的URL
      curSongUrl: '',
      // 歌词
      lyric: [{ time: 0, lrc: '暂无歌词', next: 100000 }],
      // 歌曲的播放状态（默认为：false，不播放）
      isPlaying: false,
      // 当前音乐播放时间
      curDuration: 0,
      // 展示播放列表
      showPlaylist: false,
      // 展示歌曲详情页
      showSongDetails: false,
    }
  },
  getters: {

  },
  actions: {
    // 如果index变动了，需要变动curSongInfo 、 curSongUrl 和 歌词 还有评论
    async updateCurSong() {
      this.curSongInfo = this.playlist[this.index]
      // 获取歌曲url
      const urlRes: any = await songUrlApi(this.curSongInfo.id)
      this.curSongUrl = urlRes.data[0].url
      // 获取 纯字符串的歌词
      const lyricRes: any = await lyricApi(this.curSongInfo.id)
      const lyricStr = lyricRes.lrc.lyric
      // 格式化歌词
      this.lyric = this.formatLyric(lyricStr)
    },
    // 把纯字符串歌词分割成数组 且计算歌词出现时间
    formatLyric(lyricStr: string) {
      let lyricArr = lyricStr.split(/[(\r\n)\r\n]+/).map((item: string) => {
        const min = item.slice(1, 3); // 分
        const sec = item.slice(4, 6); // 秒
        let mill: number | string = Number(item.slice(7, 10))
        let lrc = item.slice(11, item.length)
        // 如果毫秒为两位
        if (isNaN(Number(mill))) {
          mill = Number(item.slice(7, 9)) * 10
          lrc = item.slice(10, item.length)
        }
        // 统计每段歌词出现的时间
        const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + mill
        return { time, lrc, next: 0 }
      });
      // 每个歌词记录下一句歌词出现时间
      lyricArr.forEach((item, i) => {
        if (i === lyricArr.length - 1 || isNaN(lyricArr[i + 1].time)) {
          // 异常歌词显示到下下句 或者直接只显示1.5s
          item.next = lyricArr[i + 2] ? lyricArr[i + 2].time : item.time + 1500
        } else {
          item.next = lyricArr[i + 1].time
        }
      })
      return lyricArr
    },
  }
})
