<template>
  <div class="app">
    <router-view/>
  </div>
</template>


<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'

// 装饰器模式
@Component({
    components:{}
})

export default class App extends Vue{
  // 存储用户信息
  @Action('setUser') setUser: any;
  created() {
    this.setUser(localStorage.getItem('token'))
  }
}

</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
}
</style>
