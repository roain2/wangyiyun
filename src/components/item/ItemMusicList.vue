<template>
    <div class="ItemMusicList">
        <div class="itemlisttop">
            <div class="itemtopleft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <span> 播放全部(共{{}}首)</span>
            </div>
            <div class="itemtopright">
                <div class="itemrighticon">
                    <svg class="icon shoucang" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                    <span>收藏({{ subscribedCount }})</span>
                </div>
            </div>
        </div>
        <div class="musiclist">
            <div class="item" v-for="(item, i) in itemList" :key="i">
                <div class="itemleft" @click="playmusic(i)">
                    <span style="font-size:17px">{{ i + 1 }}</span>
                    <div class="itemfont">
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, index) in item.ar" :key="index">{{
                            item1.name
                        }}</span>
                    </div>
                </div>
                <div class="itemicon">
                    <svg v-if="item.mv != 0" class="icon bofang" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-danlieliebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    setup(props) {
        console.log(props)     
    },
    props: ['subscribedCount', 'itemList'],
    methods:{
        playmusic:function(i){
            this.updateplaylist(this.itemList)
            this.updateplaylistindex(i)
        },
        ...mapMutations(['updateplaylist','updateplaylistindex'])
    }
}
</script>
<style lang="less" scoped>
.ItemMusicList {
    width: 100%;
    border-top-left-radius: 0.4rem;
    margin-top: 0.2rem;
    border-top-right-radius: 0.4rem;
    background-color: #fff;

    .itemlisttop {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 1rem;

        .itemtopleft {
            display: flex;
            width: 50%;
            align-items: center;

            span {
                display: inline-block;
                margin-left: .6rem;
                font-size: 18px;
            }
        }

        .itemtopright {
            width: 35%;
            height: .8rem;
            background-color: red;
            border-radius: .4rem;
            display: flex;
            align-items: center;

            .itemrighticon {
                display: flex;
                align-items: center;
                margin-left: .2rem;
                fill: red;
                color: #fff;

                .shoucang {
                    fill: #fff;
                }

                span {
                    margin-left: .1rem;
                }
            }

        }
    }

    .musiclist {
        .item {
            width: 100%;
            height: 1.2rem;
            display: flex;
            align-items: center;

            .itemleft {
                display: flex;
                align-items: center;
                .itemfont {
                    margin-left: .4rem;

                    p {
                        font-weight: bold;
                        font-size: 18px;
                    }

                    span {
                        color: #aaa;
                    }
                }
            }

            .itemicon {
                position: absolute;
                right: 0;

                .bofang {
                    margin-right: .4rem;
                }
            }
        }
    }
}</style>