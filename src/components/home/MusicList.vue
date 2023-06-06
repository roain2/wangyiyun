<template>
    <div class="musiclist">
        <div class="musictop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musiccontent">
            <van-swipe :loop="false" :width="150" class="myswpier" :show-indicators="false">
                <van-swipe-item v-for="item in state.musiclist" :key="item">
                    <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
                        <img :src="item.picUrl" alt="">
                        <span class="playcount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-a24gl-play"></use>
                            </svg>
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted } from 'vue';
import { getmusiclist } from '@/request/home/index.js'
export default {
    /* data() {
        return {
            musiclist: [],
        }
    },
    methods:{
        async getgedan(){
            let res = await getmusiclist();
            this.musiclist=res.data.result
            console.log(res)
        },
        changeCount:function(num){
            if(num>=100000000){
                return(num/100000000).toFixed(1) +'亿'
            }else if(num>=10000){
                return(num/10000).toFixed(1) + '万'
            }
        }
    },
    mounted(){
        this.getgedan()
    } */
    //vue3写法
    setup() {
        const state = reactive({
            musiclist: [],
        });
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
        onMounted(async () => {
            let res = await getmusiclist();
            state.musiclist = res.data.result;
            console.log(res)
        });
        return { state, changeCount }
    }
}
</script>
<style lang="less" scoped>
.musiclist {
    width: 100%;
    height: 5rem;

    .musictop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .musiccontent {
        width: 100%;
        height: 4.4rem;

        .myswpier {
            height: 100%;

            img {
                width: 100%;
                height: 3rem;
            }

            .playcount {
                position: absolute;
                top: 0px;
                right: .2rem;
                z-index: 1;
                color: white;
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>