import { createStore } from 'vuex'
import { getlogin } from '../request/home/index.js'
import { getlyric } from '../request/home/item.js'
export default createStore({
  state: {
    playList: [{
      al: {
        id: 163811877,
        name: "GoodBye",
        pic: 109951168552271540,
        picUrl: "http://p4.music.126.net/GVLD55KHhWQjMzMug-NhJw==/109951168552271541.jpg",
        pic_str: "109951168552271541"
      },
      id: 2040102397,
      ar:[{
        name:'GoodBye'
      }]
    }],
    playListIndex: 0,//默认的下标为0
    isshow:true,//暂停按钮的显示
    detailshow:false,//歌曲详情页的显示
    lyriclist:{},//歌词
    currenttime:0,//当前时间
    duration:0,
    isLogin:false,
    isfootermusic:true
  },
  mutations: {
    updateshow:function(state,value){
      state.isshow=value
    },
    updateplaylist:function(state,value){
      state.playList=value
      console.log(state.playList)
    },
    updateplaylistindex:function(state,value){
      state.playListIndex=value
    },
    updatedetailshow:function( state){
      state.detailshow=!state.detailshow
    },
    updatelyriclist:function(state,value){
      state.lyriclist=value
    },
    updatecurrenttime:function(state,value){
      state.currenttime=value
    },
    updataduration:function(state,value){
      state.duration=value
    },
    pushplaylist:function(state,value){
      state.playList.push(value)
    }
  },
  actions: {
    getlyric:async function(context,value){
      let res=await getlyric(value);
      console.log(res);
      context.commit('updatelyriclist',res.data.lrc)
    },
    getlogin:async function(context,value){
      let res= await getlogin(value);
      console.log(res);
    }
  },
  modules: {
  }
})
