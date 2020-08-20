import Layout from '@/layout'
const workspaceRouter = [{
    path: '/manual',
    name: 'Manual',
    component: Layout,
    meta: {
        hideInMenu: false,
        title: '产品手册',
        icon: 'qrcode',
    },
    children: [{
        path: 'list',
        name: 'ManualList',
        meta: {
            hideInMenu: false,
            title: '手册管理',
        },
        component: () => import('@/views/workspace/manual/ManualList')
    }, {
        path: 'add',
        name: 'ManualAdd',
        meta: {
            hideInMenu: true,
            title: '新增手册',
        },
        component: () => import('@/views/workspace/manual/ManualAdd')
    },
    {
        path: 'edit/:id',
        name: 'ManualEdit',
        meta: {
            hideInMenu: true,
            title: '编辑手册',
        },
        component: () => import('@/views/workspace/manual/ManualEdit')
    },
    {
        path: 'info/:id',
        name: 'ManualInfo',
        meta: {
            hideInMenu: true,
            title: '手册详细',
        },
        component: () => import('@/views/workspace/manual/ManualInfo')
    }
    ]
}, {
    path: '/product',
    name: 'Product',
    component: Layout,
    meta: {
        hideInMenu: false,
        title: '产品中心',
        icon: 'laptop',
    },
    children: [{
        path: 'list',
        name: 'ProductList',
        meta: {
            hideInMenu: false,
            title: '产品列表',
        },
        component: () => import('@/views/workspace/product/ProductList')
    },
    {
        path: 'add',
        name: 'ProductAdd',
        meta: {
            hideInMenu: true,
            title: '产品入库',
        },
        component: () => import('@/views/workspace/product/ProductHandle')
    },
    {
        path: 'info/:id',
        name: 'ProductInfo',
        meta: {
            hideInMenu: true,
            title: '产品详细',
        },
        component: () => import('@/views/workspace/product/ProductInfo')
    }
    ]
}]

export default workspaceRouter