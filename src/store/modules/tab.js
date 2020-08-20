import * as _ from 'lodash'
import {
    ADD_TAB_VIEW,
    ADD_CACHE_TAB_VIEW,
    UPDATE_TAB_VIEW,
    DEL_TAB_VIEW,
    DEL_ALL_CACHED_VIEWS,
    DEL_ALL_TAB_VIEWS,
    DEL_OTHERS_CACHED_VIEWS,
    DEL_OTHERS_TAB_VIEWS,
    DEL_CACHED_VIEW
} from '../mutation-types'

const state = {
    tabList: [],
    cachedTabList: []
}

const getters = {
    tabLength: state => state.tabList.length,
    cacheTabLength: state => state.cachedTabList.length
}

const mutations = {
    [ADD_TAB_VIEW](state, view) {
        let index = state.tabList.findIndex(ele => ele.name == view.name);
        if (index > -1) {
            let _view = state.tabList[index]
            if (!_.isEqual(_view, view)) {
                state.tabList.splice(index, 1, _.assign(_view, view))
            }
            return;
        }
        // if (state.tabList.some(v => v.name === view.name)) return
        state.tabList.push(
            _.assign({}, view, {
                title: view.meta.title || '无标题',
                param: view.param || {},
                query: view.query || {}
            })
        )
    },
    [ADD_CACHE_TAB_VIEW](state, view) {
        if (state.cachedTabList.includes(view.name)) return
        if (!view.meta || !view.meta.noCache) {
            state.cachedTabList.push(view.name)
        }
    },
    [UPDATE_TAB_VIEW](state, view) {
        for (let v of state.tabList) {
            if (v.path === view.path) {
                v = Object.assign(v, view)
                break
            }
        }
    },
    [DEL_ALL_TAB_VIEWS](state) {
        // 保留不可移除的tab
        const notClosableList = state.tabList.filter(tag => tag.meta.closable === false)
        state.tabList = notClosableList
    },
    [DEL_CACHED_VIEW](state, view) {
        const index = state.cachedTabList.indexOf(view.name)
        index > -1 && state.cachedTabList.splice(index, 1)
    },
    [DEL_TAB_VIEW](state, view) {
        for (const [i, v] of state.tabList.entries()) {
            if (v.name === view.name) {
                state.tabList.splice(i, 1)
                break
            }
        }
    },
    [DEL_ALL_CACHED_VIEWS](state) {
        state.cachedTabList = []
    },
    [DEL_OTHERS_CACHED_VIEWS](state, view) {
        const index = state.cachedTabList.indexOf(view.name)
        if (index > -1) {
            state.cachedTabList = state.cachedTabList.slice(index, index + 1)
        } else {
            // if index = -1, there is no cached tags
            state.cachedTabList = []
        }
    },
    [DEL_OTHERS_TAB_VIEWS](state, view) {
        state.tabList = state.tabList.filter(v => {
            return !v.meta || v.meta.closable === false || v.path === view.path
        })
    }

}

const actions = {
    addTab({
        dispatch
    }, view) {
        dispatch('addTabView', view)
        dispatch('addCachedTab', view)
    },
    addTabView({
        commit
    }, view) {
        commit(ADD_TAB_VIEW, view)
    },
    addCachedTab({
        commit
    }, view) {
        commit(ADD_CACHE_TAB_VIEW, view)
    },
    delTab({
        dispatch,
        state
    }, view) {
        return new Promise(resolve => {
            dispatch('delVisitedTab', view)
            dispatch('delCachedTab', view)
            resolve({
                tabList: [...state.tabList],
                cachedTabList: [...state.cachedTabList]
            })
        })
    },
    delVisitedTab({
        commit,
        state
    }, view) {
        return new Promise(resolve => {
            commit(DEL_TAB_VIEW, view)
            resolve([...state.tabList])
        })
    },
    delCachedTab({
        commit,
        state
    }, view) {
        return new Promise(resolve => {
            commit('DEL_CACHED_VIEW', view)
            resolve([...state.cachedTabList])
        })
    },
    delAllTabs({
        dispatch,
        state
    }, view) {
        return new Promise(resolve => {
            dispatch('delAllVisitedTabs', view)
            dispatch('delAllCachedTabs', view)
            resolve({
                tabList: [...state.tabList],
                cachedTabList: [...state.cachedTabList]
            })
        })
    },
    delAllVisitedTabs({
        commit,
        state
    }) {
        return new Promise(resolve => {
            commit('DEL_ALL_TAB_VIEWS')
            resolve([...state.tabList])
        })
    },

    delAllCachedTabs({
        commit,
        state
    }) {
        return new Promise(resolve => {
            commit('DEL_ALL_CACHED_VIEWS')
            resolve([...state.cachedTabList])
        })
    },
    updateTab({
        commit
    }, view) {
        commit(UPDATE_TAB_VIEW, view)
    },
    delOtherTabs({
        dispatch,
        state
    }, view) {
        return new Promise(resolve => {
            dispatch('delOtherVisitedTabs', view)
            dispatch('delOtherCachedTabs', view)
            resolve({
                tabList: [...state.tabList],
                cachedTabList: [...state.cachedTabList]
            })
        })
    },
    delOtherVisitedTabs({
        commit,
        state
    }, view) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_TAB_VIEWS', view)
            resolve([...state.tabList])
        })
    },
    delOtherCachedTabs({
        commit,
        state
    }, view) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_CACHED_VIEWS', view)
            resolve([...state.cachedTabList])
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}