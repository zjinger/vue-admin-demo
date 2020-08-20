import config from '@/config'
import Cookies from 'js-cookie'
import {
    TOGGLE_SIDEBAR,
    SET_SIZE,
    SET_MENU
} from '../mutation-types'
import {
    routes
} from '@/router'
import {
    updateMenuByRoutes,
    getHomeRoute
} from '@/utils/menu'
const state = {
    sidebar: {
        collapsed: config.collapsed,
        selectedKeys: []
    },
    size: Cookies.get('size') || 'medium',
    menuList: updateMenuByRoutes(routes),
}
const getters = {
    sidebar: (state) => state.sidebar,
    homeRoute: () => {
        let home = getHomeRoute(routes, config.homeName)
        return home
    }
}
const mutations = {
    [TOGGLE_SIDEBAR](state) {
        state.sidebar.collapsed = !state.sidebar.collapsed
        if (state.sidebar.collapsed) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    [SET_MENU](state, menuList) {
        state.menuList = menuList
    },
    [SET_SIZE](state, size) {
        state.size = size
    },

}
const actions = {
    initMenu({
        commit
    }, menuList) {
        commit(SET_MENU, menuList)
    },
    toggleSideBar({
        commit
    }) {
        commit(TOGGLE_SIDEBAR)
    },
    setSize({
        commit
    }, size) {
        commit(SET_SIZE, size)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}