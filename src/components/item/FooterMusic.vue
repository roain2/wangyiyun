<template>
    <div class="footermusic">
        <div class="footerleft" @click="updatedetailshow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首</span>
            </div>
        </div>
        <div class="footerright">
            <svg class="icon" aria-hidden="true" v-if="isshow" @click="play">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailshow" position="right" :style="{  width: '100%', height: '100%' }">
            <MusicDetail :musiclist="playList[playListIndex]" :play="play" :isshow="isshow" :addduration="addduration"/>
        </van-popup>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    data(){
        return{
            interval:0,
        };
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isshow', 'detailshow'])
    },
    mounted(){
        console.log('11',this.$refs);
        console.log('13',this.$refs.audio.currentTime);
        this.$store.dispatch("getlyric",this.playList[this.playListIndex].id);
        this.updatetime()
    },
    updated(){
        this.$store.dispatch("getlyric",this.playList[this.playListIndex].id);
        this.addduration()
    },
    methods: {
        play: function () {
            //判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateshow(false)
                this.updatetime()
            } else {
                this.$refs.audio.pause()
                this.updateshow(true)
                clearInterval(this.interval)
            }
        },
        addduration:function(){
            this.updataduration(this.$refs.audio.duration)
        },
        updatetime:function(){
            this.interval=setInterval(() => {
                this.updatecurrenttime(this.$refs.audio.currentTime);
            }, 1000);
        },
        ...mapMutations(['updateshow', 'updatedetailshow','updatecurrenttime','updataduration']),
    },
    watch: {
        playListIndex: function () {
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.pause) {
                this.updateshow(false)
            }
        },
        playList: function () {
            if (this.isshow) {
                this.$refs.audio.autoplay = true;
                this.updateshow(false)
            }
        }
    },
    components:{
        MusicDetail
    }
}
</script>
<style lang="less" scoped>
.footermusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: .2rem;
    justify-content: space-between;

    .footerleft {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }

    .footerright {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>