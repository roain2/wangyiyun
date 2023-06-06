## 技术栈

​	本项目由vite+vue3+pinia+ts+element-plus写的高仿网易云音乐，实现了网易云音乐的主要功能。

访问地址： [神秀云音乐](http://124.222.23.222:3001//#/discover/recommend)



## 本地部署本项目

- pull

```sh
git pull https://gitee.com/zhu-liang/cloud-music-pc
```

或者直接下载ZIP

- 安装

```sh
npm i
#或者
yarn
```

- 运行

```sh
npm run dev
yarn dev
```

- 打包

```sh
npm run build
yarn build
```



## 功能介绍

### 菜单

#### 发现音乐(主页)

- 个性推荐 （推荐歌单）
- 歌单 （歌单分类/多标签分类）
- 排行榜
- 歌手（歌手分类、热门歌手）

#### MV视频

- 视频分类
- MV展示列表

#### 每日推荐

- 每日推荐歌曲歌单（需要登陆）

#### 个人信息

- 收藏歌单
- 创建歌单
- 关注列表
- 粉丝列表
- 动态（更新中）



#### 登录模块

- 密码登录（官方禁止）
- 手机验证码登录
- 自动生成二维码扫码登录 （实时刷新二维码）

- cookie 本地保存登录token记录，下次打开不用重新登录



#### 搜索模块

- 搜索歌曲
- 搜索歌单专辑
- 搜索歌手



#### 播放模块（技术难点）

- 歌曲播放时间绑定，随意拖拽进度条
- 音量控制
- 播放模式（随机，顺序，单曲循环）
- 播放列表



### 分页

#### 歌曲详情页(技术难点)

- 歌词滚动
- 唱片旋转
- 最新热评



#### 歌单详情页

- 播放、收藏、分享 交互设计
- 歌单评论
- 歌单歌曲列表
- 歌单介绍



#### 专辑详情页

- 同歌单详情页

#### 排行榜单详情页

- 同歌单详情页



#### 歌手详情页

- 热门歌曲
- 歌手自己MV
- 专辑
- 歌手介绍
- 关注交互



#### MV详情页

- MV播放
- 相关MV推荐列表
- 评论



#### 用户详情页

- 关注、粉丝列表
- 创建歌单
- 首次歌单



#### 评论模块

- 热门评论
- 最新评论
- 评论人用户详情页链接
- 发送评论
- 删除自己评论（有延迟）




