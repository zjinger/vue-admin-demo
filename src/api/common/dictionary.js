import http from '@/http'
import * as _ from 'lodash'
const baseUrl = `/api/dictionarydetail/getAll `
//缓存所有的数据字典
let _allDictionaryList = []
/**
 * 获取所有的数据字典数据，
 */
const getDictionaryList = () => {
  return new Promise((resovle, reject) => {
    if (!_allDictionaryList || _allDictionaryList.length == 0) {
      http
        .get(baseUrl)
        .then(res => {
          _allDictionaryList = res
          resovle(_allDictionaryList)
        })
        .catch(err => reject(err))
    } else {
      resovle(_allDictionaryList)
    }
  })
}

/**
 * 根据dictCode(字典值域)获取对应的数据字典数据
 * @param {*} dictCode
 */
const getDicListByCode = dictCode => {
  return getDictionaryList().then(res => {
    let arr = res.filter(ele => ele.dictCode == dictCode)
    return _.cloneDeep(arr)
  })
}

/**
 *
 * 获取产品分类数据
 *
 * @param {*} isTopParentDisabeld 父级节点是否禁用
 * @param {*} valuePros value值替换的属性
 */
const getProductCategory = (isTopParentDisabeld = false, valuePros = []) => {
  return getDicListByCode('DM_MLZL')
    .then(mlzlList => replaceFileds(mlzlList, valuePros))
    .then(mlzlList => {
      return getDicListByCode('DM_CPZL').then(cpzlList => {
        mlzlList.forEach(element => {
          if (isTopParentDisabeld) element.disabled = isTopParentDisabeld
          element.children = replaceFileds(
            cpzlList.filter(ele => ele.pitemCode == element.itemCode),
            valuePros,
            element.itemName
          )
        })
        return mlzlList
      })
    })
}
// 替换产品分类中的字段以适应 a-tree-select 的数据格式
const replaceFileds = (dictList, valuePros, parentName) => {
  if (dictList && dictList.length) {
    dictList.forEach(ele => {
      ele.key = ele.itemCode
      ele.title = ele.itemName
      if (parentName) {
        ele.pitemName = parentName
      }
      if (valuePros && valuePros.length) {
        ele.value = ''
        for (let pro of valuePros) {
          ele.value += `${ele[pro]}:`
        }
        ele.value = ele.value.substring(0, ele.value.length - 1)
      }
    })
  }
  return dictList
}
export default {
  getDictionaryList,
  getDicListByCode,
  getProductCategory
}
