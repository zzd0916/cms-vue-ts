<template>
    <el-scrollbar class="el-scrollerbar">
        <el-menu class="el-menu-slide">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'

// 装饰器模式
@Component({
    components:{}
})

export default class SideBar extends Vue{}
</script>

<style lang="scss" scoped>

</style>