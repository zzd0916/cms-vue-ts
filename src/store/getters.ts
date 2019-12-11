import { GetterTree } from 'vuex'

const getters: GetterTree <any, any> = {
    user: (state: any) => {
        // console.log("getters", state)
        return state.user;
    },
    routers: (state: any) => {
        // console.log("getters", state)
        return state.routers;
    }
}

export default getters;