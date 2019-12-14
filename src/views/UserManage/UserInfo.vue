<template>
    <div class="user">
        <div class="img-box">
            <h2 class="title">About me</h2>
            <img src="@/assets/logo.png" alt="">
            <h4>{{getUser}}</h4>
        </div>
        <div class="info-box">
            <div class="title">Account</div>
            <!-- form -->
            <el-form :model="userData" class="form-box">
                <el-form-item label="用户名">
                    <el-input v-model="getUser" readonly></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model.trim="userData.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        :disabled="!userData.password" 
                        type="primary" 
                        :loading="loading"
                        @click="onSubmit()">
                        修改密码
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation, Action} from 'vuex-class'

// 装饰器模式
@Component({
    components:{}
})

export default class UserInfo extends Vue{
    @Getter('user') getUser: any

    @Provide() userData: {username: String, password: String} = {
        username: '',
        password: ''
    }   

    // 是否发起网络请求
    @Provide() loading: boolean = false;


    created() {
        console.log(this.getUser)
    }

    onSubmit(){
        this.userData.username = this.getUser;
        this.loading = true;

        //发起请求
        (this as any).$axios
            .post('/api/user/changePassword', this.userData)
            .then((res: any) => { 
                this.loading = false;
                console.log(res.data)
                if(res.data.success) {
                    this.$message({
                        type: 'success',
                        message: "修改密码成功"
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.errorMsg
                    })
                }
            })
            .catch( (err: any) => {
                this.loading = false;
                console.log(err)
            })

    }
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    height: 100%;
    .title {
        font-size: 20px;
        color: #999;
        border-bottom: 1px solid #dedede;
        padding: 10px;
        margin-bottom: 20px;
    }
    .img-box{
        height: 100%;
        padding: 20px;
        width: 400px;
        box-sizing: border-box;
        background: #fff;
        text-align: center;
        .title {
            text-align: left;
        }
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #000;   
            padding: 20px;
        }
    }
    .info-box{
        flex: 1;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        .form-box {
            padding: 10px;
        }
    }
}
</style>