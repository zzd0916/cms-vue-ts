<template>
    <div class="layout">
        <!-- 头部 -->
        <LayoutHeader />
        <!-- 内容 -->
        <Content>
            <SideBar slot="left"></SideBar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import LayoutHeader from './LayoutHeader.vue'
import Content from './Content.vue'
import SideBar from './SideBar.vue'

// 装饰器模式
@Component({
    components:{
        LayoutHeader,
        Content,
        SideBar
    }
})

export default class Layout extends Vue{}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #c1c1c1;
}
</style>