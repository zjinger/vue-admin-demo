import dictService from './dictionary'
import companyService from './company'
export default {
  getAllDicList: dictService.getDictionaryList,
  getCompanyList: companyService.getCompanyList,
  getDicListByCode: dictService.getDicListByCode,
  getProductCategoryList: dictService.getProductCategory
}
