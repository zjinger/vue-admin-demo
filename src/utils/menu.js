import * as _ from 'lodash'
export const updateMenuByRoutes = (routes) => {
    return convertRoutesToMenus(_.cloneDeep(routes));
}
/**
 * 获取主页路由
 * @param {*} routes 
 * @param {*} homeName 
 * @param {*} parent 
 */
export const getHomeRoute = (routes, homeName, parent) => {
    let i = -1
    let len = routes.length
    let homeRoute = {}
    while (++i < len) {
        let item = routes[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName, item)
            if (res.name) return res
        } else {
            if (item.name === homeName) {
                homeRoute = item
                if (parent && parent.path) {
                    homeRoute.fullPath =
                        `${parent.path.lastIndexOf('/') > -1 ? parent.path.substr(0, parent.length - 1) : parent.path}/${item.path}`
                }
            }

        }
    }
    return homeRoute
}

const convertRoutesToMenus = (routes) => {
    let items = _convertArrayToItems(routes);
    return _skipEmpty(items);
}

const _convertArrayToItems = (routes, parent) => {
    let items = [];
    routes.forEach(route => {
        items.push(_convertObjectToItem(route, parent));
    })
    return items
}

const _convertObjectToItem = (route, parent) => {
    let menuItem = {};
    let {
        path,
        meta
    } = route;
    if (!meta || (meta && !meta.hideInMenu)) {
        menuItem.name = route.name;
        menuItem.icon = meta && meta.icon || '';
        menuItem.title = meta && meta.title || '';
        menuItem.meta = meta;
        menuItem.path = path;
    } else {
        menuItem.hideInMenu = true;
    }
    if (parent && parent.fullPath) {
        menuItem.fullPath = path && path.indexOf('/') > -1 ? menuItem.path : parent.fullPath + '/' + menuItem.path;
    } else {
        menuItem.fullPath = path.indexOf('/') > -1 ? path : '/' + path;
    }
    if (route.children && route.children.length > 0) {
        menuItem.children = _convertArrayToItems(route.children, menuItem)
            .filter(ele => !ele.hideInMenu);
    }
    return menuItem;
}
/**
 * 过滤掉隐藏的路由
 * @param {*} items 
 */
const _skipEmpty = items => {
    let menu = [];
    items.forEach((item) => {
        let menuItem;
        if (item.hideInMenu) {
            if (item.children && item.children.length > 0) {
                menuItem = _skipEmpty(item.children);
            }
        } else {
            menuItem = item;
        }
        if (menuItem && !menuItem.hideInMenu) {
            menu.push(menuItem);
        }
    });
    return [].concat.apply([], menu);
}
