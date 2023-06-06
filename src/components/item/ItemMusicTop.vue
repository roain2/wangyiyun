<template>
    <div class="itemmusictop">
        <img :src="playList.coverImgUrl" alt="" class="bgimg">
        <div class="itemleft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-fanhuijian"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemright">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
        </div>

    </div>
    <div class="centercontent">
        <div class="centercontentleft">
            <img :src="playList.coverImgUrl" alt="" class="smallimg">
            <div class="playcount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a24gl-play"></use>
                </svg>
                <span>{{ changeCount(playList.playCount) }}</span>
            </div>
        </div>
        <div class="centercontentright">
            <span>{{ playList.name }}</span>
            <div class="userinfo">
                <img :src="playList.creator.backgroundUrl" alt="" class="userimg">
                <span>{{ playList.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou"></use>
                </svg>
            </div>
            <div class="centercontentfooter">
                <span>{{ playList.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou"></use>
                </svg>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footeritem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span>{{ playList.commentCount }}</span>
        </div>
        <div class="footeritem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playList.shareCount }}</span>
        </div>
        <div class="footeritem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="footeritem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>
<script>
export default {
    setup(props) {
        if ((props.playList.creator = "")) {
            props.playList.creator = JSON.parse(sessionStorage.getItem().playList).creator
        }
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
        return{changeCount}
    },
    props: ['playList']
}
</script>
<style lang="less" scoped>
.itemmusictop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;
    position: relative;

    .itemright,
    .itemleft {
        fill: #fff;
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px;

        span {
            font-size: .4rem;
            color: #fff;
        }
    }

    .bgimg {
        width: 100%;
        height: 11rem;
        z-index: -1;
        position: fixed;
        filter: blur(30px);
    }
}

.centercontent {
    display: flex;
    width: 100%;
    height: 3.5rem;

    .centercontentleft {
        width: 2.4rem;
        margin-top: .6rem, ;
        margin-left: .1rem;
        position: relative;
        .smallimg {
            width: 2.4rem;
            border-radius: 10px;
        }

        .playcount {
            position: absolute;
            top:0px;
            right: .2rem;
            color: white;
            display: flex;
            align-items: center;
        }
    }

    .centercontentright {
        color: #fff;
        margin-top: .6rem, ;
        margin-left: .1rem;
        width: 100%;

        .userinfo {
            margin-top: .2rem;
            display: flex;
            align-items: center;
            fill: #808080;

            .userimg {
                width: 12%;
                border-radius: 50%;
            }
        }
    }

    .centercontentfooter {
        margin-top: .2rem;
        width: 100%;
        height: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        fill: #fff;

        span {
            width: 95%;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 0.24rem;
            color: #ccc;
        }

    }
}

.footer {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .footeritem {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        fill: #fff;

        span {
            color: #fff;
        }
    }
}</style>