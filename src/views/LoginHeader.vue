<template>
    <div class="login-header">
        <!-- 插槽 -->
        <div class="container">
            <slot name="container"></slot>
        </div>
        
    </div>
</template>


<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {}
})

export default class LoginHeader extends Vue {}

</script>


<style lang="scss">
.login-header {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 100px;
    .container {
        width: 250px;
    }
}
</style>