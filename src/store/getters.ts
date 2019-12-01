import { GetterTree } from 'vuex'

const getters: GetterTree <any, any> = {
    getUser: (state: any) => {
        // console.log("getters", state)
        return state.user;
    }
}

export default getters;