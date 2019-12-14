<template>
    <div class="layout-header">
        <el-row>
            <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
                <div class="system-info">
                    <img class="logo" src="@/assets/logo.png" alt="logo" />
                    <span class="title">进击的小牛牛</span>
                </div>
            </el-col>
            <el-col  :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
                <el-dropdown class="system-user" @command="userCommand">
                    <span class="userinfo-inner">
                        <!-- <img :src="require('@/assets/' + getUser.key +'.jpg')" alt=""> -->
                        <img src="@/assets/logo.png" alt="">
                        {{getUser}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userCenter" >个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="logout" >注销登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> 
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'

// 装饰器模式
@Component({
    components:{}
})

export default class LayoutHeader extends Vue{
    @Getter('user') getUser: any;

    userCommand(command: String):void {
        if(command === "logout") {
            localStorage.removeItem('token');
            this.$router.replace('/login')
        }
        if(command === "userCenter") {
            this.$message.info('userCenter')
            this.$router.push("/user")
        }
    }
    created() {
        // console.log(this.getUser)
    }

}


</script>

<style lang="scss" scoped>
.layout-header {
    background: #333;
    line-height: 60px;
    height: 60px;
    color: #fff;
    overflow: hidden;
    .system-info {
        vertical-align: middle;
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0px 0 0px 5px;
            display: inline-block;
            vertical-align: middle;
        }
    }
    .system-user {
        float: right;
        .userinfo-inner {
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin: 0px 0 0px 5px;
                display: inline-block;
                vertical-align: middle;
            }
        }
        
    }
}
</style>