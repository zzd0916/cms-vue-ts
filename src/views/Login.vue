<template>
    <div class="login">
        <LoginHeader>
            <!-- 插入插槽 -->
            <div slot="container">
                <h2 class="login-title">登陆系统</h2>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="0px">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="账号">
                            <i slot="prefix" class="fa fa-user-o"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码">
                            <i slot="prefix" class="fa fa-lock f18"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="isLoading" @click.native.prevent="submitForm('ruleForm')">登陆</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">
                            7天内自动登陆
                        </el-checkbox>
                        <el-button type="text" class="forget">忘记密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </LoginHeader>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation, Action} from 'vuex-class'
import LoginHeader from './LoginHeader.vue'

@Component({
    components: { LoginHeader }
})

export default class Login extends Vue {
    // 存储用户信息
    @Action('setUser') setUser: any

    // 装饰器，相当于 data 
    @Provide() isLoading:Boolean = false;

    @Provide () ruleForm: {
        username: String,
        password: String,
        autoLogin: Boolean
    } = {
        username: '',
        password: '',
        autoLogin: false
        
    }

    @Provide() rules = {
        username: [
            {required: true, message: "请输入账户", trigger: 'blur'}
        ],
        password: [
            {required: true, message: "请输入密码", trigger: 'blur'}
        ]
    }

    submitForm(formName:any):void {
        (this.$refs[formName] as any).validate( (valid: Boolean) => {
            if(valid) {
                this.isLoading = true;
                (this as any ).$axios.post('/api/login', this.ruleForm)
                    .then( (res: any) => {
                        this.isLoading = false;
                        console.log(res.data)
                        if(res.data.success) {
                            this.$message.success('登陆成功');
                            // 存储到 localStorage 中
                            localStorage.setItem('token' , res.data.data.token);

                            // 存储到 vuex 中
                            this.setUser(res.data.data.token);
                            this.$router.push('/');

                        } else {
                            this.$message.error(res.data.errMsg);
                        }
                        

                    }).catch( (err:any) => {
                        console.log(err)
                        this.isLoading = false;
                    })
            }else {
                alert('校验失败')
            }
        })
    }

    resetForm(formName:any):void {
        (this.$refs[formName] as any).resetFields();
    }
}

</script>

<style lang="scss" scoped>
.login{
    .login-title {
        text-align: center;
        margin-bottom: 10px;
    }
    .el-form-item {
        text-align: center;
        i {
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 16px;
        }
        .f18 {
            font-size: 18px;
        }
    }
}
</style>