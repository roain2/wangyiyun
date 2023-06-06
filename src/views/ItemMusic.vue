<template>
    <ItemMusicTop :playList="state.playList"/>
    <ItemMusicList  :itemList="state.playList.tracks" :subscribedCount="state.playList.subscribedCount"/>
</template>
<script>
import {useRoute} from 'vue-router'
import {onMounted,reactive} from 'vue'
import {getMusicItemList,getItemList} from '@/request/home/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default{
    setup(){
        const state = reactive({
            playList:[],
            itemList:[],
            length:[]
        });
        onMounted(async()=>{
            let id=useRoute().query.id;
            console.log('@',useRoute());
            let res=await getMusicItemList(id);
            let result = await getItemList({ id, limit: 10, offset: 0 });
            console.log(res);
            state.playList=res.data.playlist
            console.log(result)
            state.itemList=res.data.songs
            //防止页面刷新，数据丢失，将数据保存到sessionstorge
            sessionStorage.setItem('itemdetail',JSON.stringify(state))
        });
        return{state}
    },
    components:{
        ItemMusicTop,
        ItemMusicList
    }
}
</script>