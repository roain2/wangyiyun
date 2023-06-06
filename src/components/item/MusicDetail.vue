<template>
    <img :src="musiclist.al.picUrl" alt="" class="bigimg">
    <div class="detailtop">
        <div class="detailtopleft">
            <svg class="icon" aria-hidden="true" @click="backhome">
                <use xlink:href="#icon-fanhuijian"></use>
            </svg>
            <div class="detailitem">
                <marquee style="color:#fff">{{ musiclist.al.name }}</marquee>
                <div class="detailfont">
                    <span v-for="item in musiclist.ar" :key="item">
                        {{ item.name }}
                    </span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiangyoujiantou"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="detailtopright">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detailcontent" v-show="!islyricshow" @click="islyricshow = 'true'">
        <img src="@/assets/needle-ab.png" alt="" class="img-needle-ab" :class="{ img_needle_active: !isshow }" />
        <img src="@/assets/cd.png" alt="" class="img-cd">
        <img :src="musiclist.al.picUrl" alt="" class="img-ar" :class="{ img_ar_active: !isshow, img_ar_pause: isshow }">
    </div>
    <div class="musiclyric" ref="musiclyric" v-show="islyricshow">
        <p v-for="item in lyric" :key="item"
            :class="{ active: (currenttime * 1000 >= item.time && currenttime * 1000 < item.pre) }">
            {{ item.lrc }}
        </p>
    </div>
    <div class="detailfooter">
        <div class="footertop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-heijiaochangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
            </svg>
        </div>
        <div class="footercontent">
            <input type="range" class="range" min="0" :max="duration" v-model="currenttime" step="0.05">
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-repeat2"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goplay(-1)">
                <use xlink:href="#icon-fangxiangyuan-xiangzuo"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-if="isshow" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goplay(1)">
                <use xlink:href="#icon-fangxiangyuan-xiangyou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            islyricshow: false,
        };
    },
    computed: {
        ...mapState(["lyriclist", 'currenttime', 'playListIndex', 'playList', 'duration']),
        lyric: function () {
            let arr;
            if (this.lyriclist.lyric) {
                arr = this.lyriclist.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)
                    let lrc = item.slice(11, item, length)
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9)
                        lrc = item.slice(10, item.length)
                        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    }
                    return { min, sec, mill, lrc, time }
                })
                arr.forEach((item, i) => {
                    if (i == arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000
                    } else {
                        item.pre = arr[i + 1].time
                    }
                })
            }
            console.log(arr);
            return arr;
        }
    },
    /* mounted(){
        console.log(this.musiclist);
    }, */
    mounted(){
        this.addduration();
    },
    methods: {
        backhome: function () {
            this.islyricshow = false
            this.updatedetailshow()
        },
        goplay: function (Number) {
            let index = this.playListIndex + Number
            if (index < 0) {
                index = this.playList.length - 1
            } else if (index == this.playList.length) {
                index = 0
            }
            this.updateplaylistindex(index)
        },
        ...mapMutations(['updatedetailshow', 'updateplaylistindex']),
    },
    watch: {
        currenttime: function (newValue) {
            let p = document.querySelector("p.active")
            if (p) {
                if (p.offsetTop > 300) {
                    this.$refs.musiclyric.scrollTop = p.offsetTop - 300
                }
            }
            if(newValue==this.duration){ 
                if(this.playListIndex==this.playListIndex+1){
                    this.updateplaylistindex(0)
                    this.play()
                }else{
                    this.updateplaylistindex(this.playListIndex+1)
                }
            }
        }
    },
    props: ['musiclist', 'play', 'isshow', 'addduration']
}
</script>
<style lang="less" scoped>
.bigimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(80px);
}

.detailtop {
    width: 100%;
    display: flex;
    height: 1.2rem;
    align-items: center;
    justify-content: space-between;

    .detailtopleft {
        display: flex;
        align-items: center;

        .icon {
            width: .5rem;
        }

        .detailitem {
            margin-left: .6rem;

            marquee {
                width: 3rem;
            }

            .detailfont {
                display: flex;
                align-items: center;

                span {
                    color: #999;
                }

                .icon {
                    width: .25rem;
                }
            }
        }
    }

    .detailtopright {
        display: flex;

        .icon {
            height: 1rem;
            width: 1rem;
        }
    }
}

.detailcontent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img-needle-ab {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-0deg);
        transition: all 2s;
    }

    .img-cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .img-ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_pause {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}

.detailfooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footertop {
        display: flex;
        justify-content: space-around;

        .icon {
            transform: scale(1.25);
        }
    }

    .range {
        width: 100%;
        height: 0.6rem;
    }

    .footer {
        margin-top: 1.7rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
            fill: #fff;
        }

        .bofang {
            width: 1rem;
            height: 1rem;
            fill: #fff;
        }
    }
}

.musiclyric {
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;

    p {
        color: rgb(167, 157, 157);
        margin-bottom: .4rem;
    }

    .active {
        color: #fff;
        font-size: .5rem;
    }
}</style>