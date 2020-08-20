import config from '@/config'
import {
    hasOneOf
} from '@/utils/tools'
const {
    title
} = config

/**
 * 通过路由得到菜单列表
 * @param {*} list 
 * @param {*} access 权限暂时没有控制
 */
export const getMenuByRouter = (list, access) => {
    let res = [];
    list.forEach(item => {
        let {
            path,
            meta
        } = item;
        if (!meta || (meta && !meta.hideInMenu)) {
            let menuItem = {
                icon: (meta && meta.icon) || '',
                name: item.name,
                title: (meta && meta.title) || '',
                // key: (meta && meta.key) || '',
                meta: item.meta,
                path
            }
            if (hasChild(item) || (item.meta && item.meta.showAlways)) {
                menuItem.children = getMenuByRouter(item.children, access)
                menuItem.children.forEach(ele => {
                    ele.path = `${item.path}/${ele.path}`
                })
            }
            if (item.meta && item.meta.href) menuItem.href = item.meta.href
            res.push(menuItem)
        }
    });
    return res
}

/**
 * 当前菜单是否有权限显示
 * @param {*} item 
 * @param {*} access 
 */
// eslint-disable-next-line no-unused-vars
const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
        if (hasOneOf(item.meta.access, access)) return true
        else return false
    } else return true
}
/**
 * 是否还有子菜单
 * @param {*} item 
 */
export const hasChild = item => {
    return item.children && item.children.length !== 0
}

/**
 * 设置浏览器标题
 * @param {*} _title 
 */
export const setTitle = (_title) => {
    const resTitle = _title ? _title : title
    window.document.title = resTitle;
}