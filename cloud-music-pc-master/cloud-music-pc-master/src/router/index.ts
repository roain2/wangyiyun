import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Discovery from '@/page/Discovery/index.vue'
import { ElMessage } from 'element-plus'
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(), // hash模式稳定
  routes: [
    //重定向：在项目运行的时候，立马定向到发现音乐页面，否则页面可能不展示内容或者展示非路由组件的内容
    {
      //Vue3需要使用正则的形式配置指定未识别的路径 :pathMatch(.*)*
      path: '/:pathMatch(.*)*',
      redirect: '/discover/recommend',
    },
    // 发现音乐页
    {
      path: '/discover',
      name: 'discovery',
      component: Discovery,
      redirect: '/discover/recommend',
      children: [
        {
          path: '/discover/recommend',
          component: () => import('@/page/Discovery/Recommend.vue'),
          name: 'recommend',
        },
        {
          path: '/discover/songList',
          component: () => import('@/page/Discovery/Playlist.vue'),
          name: 'songList',
        },
        {
          path: '/discover/rank',
          component: () => import('@/page/Discovery/Rank.vue'),
          name: 'rank',
        },
        {
          path: '/discover/singer',
          component: () => import('@/page/Discovery/Singer.vue'),
          name: 'singer',
        },
      ],
    },
    // MV视频
    {
      path: '/video',
      component: () => import('@/page/Video/index.vue'),
      name: 'video',
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 每日推荐
    {
      path: '/dailyStar',
      name: 'dailyStar',
      component: () => import('@/page/DailyStar/index.vue'),
      beforeEnter: (to, form, next) => {
        if (localStorage.getItem('cookie')) {
          next()
        } else {
          ElMessage.warning('必须登录才能访问每日推荐')
        }
      }
    },
    // 我的音乐
    {
      path: '/myMusic',
      name: 'myMusic',
      component: () => import('@/page/MyMusic/index.vue'),
      beforeEnter: (to, form, next) => {
        if (localStorage.getItem('cookie')) {
          next()
        } else {
          ElMessage.warning('必须登录才能访问我的音乐')
        }
      }
    },
    // 歌单详情页
    {
      path: '/playlistDetails/:id',
      component: () => import('@/page/PlaylistDetails/index.vue'),
      name: 'playlistDetails',
      // 参数携带id
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 歌手详情页
    {
      path: '/singerDetails/:id',
      component: () => import('@/page/SingerDetails/index.vue'),
      name: 'singerDetails',
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 专辑详情页
    {
      path: '/albumDetails/:id',
      component: () => import('@/page/AlbumDetails/index.vue'),
      name: 'albumDetails',
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 用户详情页
    {
      path: '/userDetails/:id',
      component: () => import('@/page/UserDetails/index.vue'),
      name: 'userDetails',
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 关注列表
    {
      path: '/userDetails/follows/:id',
      component: () => import('@/page/UserDetails/Follows.vue'),
      name: 'follows',
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 粉丝列表
    {
      path: '/userDetails/followeds/:id',
      component: () => import('@/page/UserDetails/Followeds.vue'),
      name: 'followeds',
      props($route) {
        return {
          id: $route.params.id,
        }
      }
    },
    // 视频详情页
    {
      path: '/videoDtails/:id',
      component: () => import('@/page/Video/VideoDetails.vue'),
      name: 'videoDetails',
      props($route) {
        return {
          id: $route.params.id,
        }
      },
    },
    // 搜索模块
    {
      path: '/search',
      component: () => import('@/page/Search/index.vue'),
      redirect: '/search/songs',
      children: [
        // 搜索单曲
        {
          path: '/search/songs/:keywords',
          component: () => import('@/page/Search/SSongs.vue'),
          name: 'searchSongs',
          props($route) {
            return {
              keywords: $route.params.keywords,
            }
          },
        },
        // 搜索歌手
        {
          path: '/search/singer/:keywords',
          component: () => import('@/page/Search/SSinger.vue'),
          name: 'searchSinger',
          props($route) {
            return {
              keywords: $route.params.keywords,
            }
          },
        },
        // 搜索歌单
        {
          path: '/search/playlist/:keywords',
          component: () => import('@/page/Search/SPlaylist.vue'),
          name: 'searchPlaylist',
          props($route) {
            return {
              keywords: $route.params.keywords,
            }
          },
        },
        // 搜索专辑
        {
          path: '/search/album/:keywords',
          component: () => import('@/page/Search/SAlum.vue'),
          name: 'searchAlbum',
          props($route) {
            return {
              keywords: $route.params.keywords,
            }
          },
        },
        // 搜索MV
        {
          path: '/search/mv/:keywords',
          component: () => import('@/page/Search/SMV.vue'),
          name: 'searchMV',
          props($route) {
            return {
              keywords: $route.params.keywords,
            }
          },
        },
      ],
    },
  ]
})

// 全局路由

export default router

