import {
    SET_IDENTITY,
    // SET_AUTHENTICATED
    SET_COUNT
} from '../mutation-types'

const state = {
    // token: getToken(),
    account: null, // 当前用户信息
    authenticated: false, // 是否已经登录
    userIdentity: undefined, // 用户认证的信息
    count: 0//未读消息
}
const getters = {
    account: state => state.account,
}
const mutations = {
    [SET_IDENTITY](state, identity) {
        state.userIdentity = identity
        state.account = identity
    },
    [SET_COUNT](state, count) {
        state.count = count
    }
    // [SET_AUTHENTICATED](state, authenticated) {
    //     state.authenticated = authenticated
    // }

}
const actions = {
    identity({
        // commit,
        state
    }, force) {
        if (force === true) {
            state.authenticated = false;
            state.userIdentity = undefined;
        }
        if (state.authenticated) {
            return Promise.resolve(state.account);
        }
        // return accountService.get().then(account => {
        //     if (account) {
        //         state.userIdentity = account;
        //         state.authenticated = true;
        //         commit('SET_IDENTITY', state.userIdentity)
        //     }
        //     return state.account
        // }).catch(() => {
        //     state.userIdentity = null;
        //     commit('SET_IDENTITY', state.userIdentity)
        //     return null
        // })

    },
    authenticate({
        commit,
        state
    }, identity) {
        state.userIdentity = identity;
        state.authenticate = identity !== null;
        commit('SET_IDENTITY', identity)
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}