<template>
    <el-container class="layout-content">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <slot name="left"></slot>
        </el-aside>
        <!-- 右侧页面 -->
        <el-main>
            <!-- 面包屑导航 -->
            <div class="top">
                <i class="fa fa-reorder"></i>
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item 
                        v-for="(item,index) in breadCrumbItems"
                        :key="index"
                        :to="{path: item.path}"
                        >
                        {{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 页面内容 -->
            <div class="content">
                <slot name="content"></slot>
            </div>
        </el-main>

    </el-container>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch} from 'vue-property-decorator'

// 装饰器模式
@Component({
    components:{}
})

export default class Content extends Vue{
    @Provide() breadCrumbItems: any; // 面包屑数组

    @Watch("$route") handleRouteChange(to:any) {
        this.initBreadCrumbItems(to);
    } 

    created() {
        this.initBreadCrumbItems(this.$route);
    }

    initBreadCrumbItems(router: any) {
        // console.log(router)
        // 根路由title
        let breadCrumbItems = [{path: '/', title:'后台管理系统'}]
        // 遍历父级当前子路有页面的title和path存储到数组里
        for(let index in router.matched) {
            if(router.matched[index].meta && router.matched[index].meta.title) {
                breadCrumbItems.push({
                    path: router.matched[index].path ? router.matched[index].path : '/',
                    title: router.matched[index].meta.title
                })
            }
        }
        this.breadCrumbItems = breadCrumbItems;
        // console.log(this.breadCrumbItems)
    }
}
</script>

<style lang="scss" scoped>
.layout-content {
    width: 100%;
    height: 100%;
    background: #fff;
    .el-aside {
        border-right: 1px solid #dedede;
    }
    .el-main {
        padding: 0;
        .top {
            background: #fff;
            height: 54px;
            border-right: none;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            align-items: center;
            i{
                font-size: 18px;
                cursor: pointer;
                padding-left: 16px;
            }
            .breadcrumb {
                padding-left: 16px;
            }
        }
        .content {
            padding: 10px;
            height: calc(100% - 115px);
            box-sizing: border-box;
            background: #e6e6e6;
        }
    }
}
</style>