import Vue from 'vue'
import {
  Pagination,
  Button,
  ConfigProvider,
  Input,
  Layout,
  Icon,
  Menu,
  Upload,
  Dropdown,
  Modal,
  Tabs,
  Radio,
  Tag,
  Select,
  DatePicker,
  Row,
  Col,
  Tree,
  Spin,
  Checkbox,
  TreeSelect
} from 'ant-design-vue'

Vue.use(ConfigProvider)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(Upload)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(Input)
Vue.use(Modal)
Vue.use(Tabs)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Radio)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Spin)
Vue.use(Tabs)
Vue.use(Checkbox)
Vue.use(TreeSelect)
Vue.use(Upload)
Vue.use(Tabs)
Vue.prototype.Modal = Modal
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error