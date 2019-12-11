import { MutationTree } from 'vuex'

const mutations : MutationTree <any> = {
    SET_USER(state: any, user: any ): void {
        // console.log('mutations', user)
        state.user = user;
    },
    SET_ROUTERS(state: any, routers: any ): void {
        // console.log('mutations', user)
        state.routers = routers;
    }
}

export default mutations;   
