<template>
    <div class="not-found">
         404， not found
        <el-button @click="$router.go(-1)">
            返回上一页
        </el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'

// 装饰器模式
@Component({
    components:{}
})

export default class NotFound extends Vue{}
</script>

<style lang="scss" scoped>

</style>