<template>
    <div class="password">
        <LoginHeader>
            <!-- 插入插槽 -->
            <div slot="container">
                <h2 class="password-title">找回密码</h2>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="0px">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="用户名">
                            <i slot="prefix" class="fa fa-user-o"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="邮箱">
                            <i slot="prefix" class="fa fa-envelope-o"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="isLoading" @click.native.prevent="submitForm('ruleForm')">确定</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </LoginHeader>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import LoginHeader from './LoginHeader.vue'

@Component({
    components: { LoginHeader }
})

export default class Password extends Vue {
    @Provide() isLoading:Boolean = false;
    @Provide() ruleForm: { username:String, email:String } = {
        username: '',
        email: ''
    }

    @Provide() rules:Object = {
        username: [{
            required: true,
            message: "请输入用户名",
            trigger: 'blur'
        }],
        email : [
            {
                required: true,
                message: "请输入邮箱地址",
                trigger: 'blur'
            },
            {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: 'blur, change'
            }
        ]
    }

    submitForm(formName:any):void {
        (this.$refs[formName] as any).validate( (valid: Boolean) => {
            if(valid) {
                this.isLoading = true;
                (this as any ).$axios.post('/api/login', this.ruleForm)
                    .then( (res: any) => {
                        console.log(res.data)
                        this.isLoading = false;
                        localStorage.setItem('token' , res.data.token);
                        if(res.data.success) {
                            this.$message.success('新的密码已发送至您的邮箱')
                        } else {
                            this.$message.error(res.data.errMsg)
                        }
                    }).catch( (err:any) => {
                        console.log(err)
                        this.isLoading = false;
                    })
            }else {
                this.$message.error('校验失败')
            }
        })
    }    

    resetForm(formName:any):void {
        (this.$refs[formName] as any).resetFields();
    }

    render() {
        
    }
}

</script>


<style lang="scss" scoped>
.password {
    .password-title {
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
    }
}

</style>