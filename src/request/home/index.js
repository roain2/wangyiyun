import service from "..";
//获取首页轮播图数据
export function getBanner(){
    return service({
        method:'GET',
        url:"banner?type=2"
    })
}
//获取发现好好歌单
export function getmusiclist(){
    return service({
        method:'GET',
        url:"/personalized?limit=10"
    })
}
export function getsearchmusic(data){
    return service({
        method:'GET',
        url:`/search?keywords=${data}`
    })
}
export function getlogin(data){
    return service({
        method:'GET',
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
