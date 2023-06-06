<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-fanhuijian"></use>
        </svg>
        <input type="text" placeholder="沈凯" v-model="searchkey" @keydown.enter="enterkey">
    </div>
    <div class="searchhistory">
        <span class="searchspan">历史</span>
        <span v-for="item in keywordlist" :key="item" class="spankey" @click="searchhistory">
            {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delhistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="musiclist">
        <div class="item" v-for="(item, i) in searchlist" :key="i">
            <div class="itemleft" @click="updateindex(item)">
                <span style="font-size:17px">{{ i + 1 }}</span>
                <div class="itemfont">
                    <p>{{ item.name }}</p>
                    <span v-for="(item1, index) in item.artists" :key="index">{{
                        item1.name
                    }}</span>
                </div>
            </div>
            <div class="itemicon">
                <svg v-if="item.mvid != 0" class="icon bofang" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-danlieliebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { getsearchmusic } from '../request/home/index.js'

export default {
    data() {
        return {
            keywordlist: [],
            searchkey: "",
            searchlist: [],
        }
    },
    mounted() {
        this.keywordlist = JSON.parse(localStorage.getItem('keywordlist'))
    },
    methods: {
        enterkey: async function () {
            if (this.searchkey != "") {
                this.keywordlist.unshift(this.searchkey)
                this.keywordlist = [...new Set(this.keywordlist)]
                if (this.keywordlist.length > 10) {
                    this.keywordlist.splice(this.keywordlist.length - 1, 1)
                }
                localStorage.setItem("keywordlist", JSON.stringify(this.keywordlist))
                let res = await getsearchmusic(this.searchkey)
                console.log(res)
                this.searchlist = res.data.result.songs
                this.searchkey = ""
            }
        },
        delhistory: function () {
            localStorage.removeItem("keywordelist")
            this.keywordlist = []
        },
        searchhistory: async function (item) {
            let res = await getsearchmusic(item)
            this.searchlist=res.data.result.songs;
        },
        updateindex:function(item){
            item.al=item.album
            item.al.picUrl=item.album.artist.img1v1Url
            this.$store.commit('pushplaylist',item)
            this.$store.commit('updateplaylistindex',this.$store.state.playList.length-1)
        }
    }
}
</script>
<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: .4rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: .1rem
    }
}

.searchhistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    .searchspan {
        font-size: .4rem;
        font-weight: 700;
    }

    .spankey {
        background-color: rgb(200, 180, 180);
        padding: .1rem .2rem;
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }

    .icon {
        width: .7rem;
        height: .7rem;
        position: absolute;
        right: .2rem;
    }
}

.musiclist {
    padding: 0.2rem;
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
</style>