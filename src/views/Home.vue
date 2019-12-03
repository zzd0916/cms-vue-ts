<template>
    <div class="home">
        <div>
            <h1 class="title"> welcome to home </h1>  
            <p class="desc"> 进击的小牛牛后台管理系统</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'

// 装饰器模式
@Component({
    components:{}
})

export default class Home extends Vue{}
</script>

<style lang="scss" scoped>
.home {
    .title {
        font-size: 36px;
        text-align: center;
        font-weight: bold;
        margin: 40px;
    }
    .desc {
        font-size: 20px;
        text-align: center;
    }
}
</style>