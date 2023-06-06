<template>
    <div class="topnav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
        </div>

        <div class="topContent">
            <span @click="$router.push('/User')">我的发现</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topright">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
        
    </div>

</template>
<style lang="less" scoped>
    .topnav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content:space-between ;
        align-items: center;
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:.36rem;
        }
        .active{
            font-weight: 900;
        }
    }
</style>