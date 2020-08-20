import {
  Modal
} from 'ant-design-vue'
const confirm = (config) => {
  let {
    service,
    method,
    data,
  } = config;
  method = method ? method : 'save';
  return new Promise((resovle, reject) => {
    Modal.confirm({
      title: '保存确认',
      content: '是否保存？',
      okText: '保存',
      cancelText: '取消',
      maskClosable: false,
      onOk: () => {
        if (service[method] && typeof service[method] == 'function') {
          service[method](data).then(res => {
            Modal.success({
              title: '保存成功',
              okText: '确定',
              onOk: () => {
                resovle(res)
              }
            })
          }).catch(err => {
            Modal.error({
              title: '保存失败',
              content: err,
              onOk: () => {
                reject(err)
              }
            })
          })
        }
      },
    })
  })
}

export default {
  confirm
}