<template>
    <el-scrollbar class="el-scrollerbar">
        <el-menu class="el-menu-slide" 
            :default-active="$router.currentRoute.path"
            router>
            <template v-for="item in routers" v-if="item.show && item.children && item.children.length>0">
                 <!-- 单个子元素 -->
                <el-menu-item 
                    v-if="item.children.length == 1"
                    :index="item.children[0].path"
                    :key="item.name"
                    >
                    <i 
                        v-if="item.children[0].meta.icon" 
                        :class="item.children[0].meta.icon"></i>
                    <span slot="title">{{item.children[0].meta.title}}</span>
                </el-menu-item>

                <!-- 多个子元素 -->
                <el-submenu 
                    v-else 
                    :index="item.children[0].path"
                    :key="item.name"
                    > 
                    <template slot="title">
                        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                        <span v-if="item.meta&&item.meta.title" solt="title">{{item.meta.title}}</span>
                    </template>

                    <el-menu-item 
                        v-for="child in item.children"
                        :index="child.path"
                        :key="child.name">
                        <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                        <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                    </el-menu-item>

                </el-submenu>
            </template>

            
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { State, Getter, Mutation, Action} from 'vuex-class'

// 装饰器模式
@Component({
    components:{}
})

export default class SideBar extends Vue{
    @Getter('routers') routers: any ;

    created() {
        // console.log(this.routers)
    }
}
</script>

<style lang="scss" scoped>
.el-menu-slide {
    i {
        margin-right: 5px;
    }
    .fa-home {
        font-size: 18px;
    }
}
</style>