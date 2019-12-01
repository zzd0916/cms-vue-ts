<template>
    <div class="home">
        This is home
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

</style>