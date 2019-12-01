import { ActionTree } from 'vuex'
import jwt_decode from 'jwt-decode'

const actions : ActionTree <any, any> = {
    async setUser({ state, commit}, user:any) {
        // 使用jwt-decode 解析 token
        // const decoded = jwt_decode(user)
        // console.log("actions",user)
        commit('SET_USER', user)
    }
}

export default actions;   
