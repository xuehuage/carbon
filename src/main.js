import Vue from 'vue'
import App from './App.vue'

import { Form,Field ,Button,Picker ,Popup,List ,Cell,Col, Row,Toast,PullRefresh,Icon,Loading ,Overlay } from 'vant';
import { utils, floatObj } from '@/utils/utils'
import dayjs from "dayjs"
import { api_name } from '@/api/api'

// 移动端适配
import '@/utils/flexible'

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import '@/assets/css/main.css'
import 'vant/lib/index.css'
import '@/assets/css/tailwendcss.css'

// 公共方法 utils
Vue.prototype.$utils = utils
Vue.prototype.$floatObj = floatObj

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$request = api_name
Vue.prototype.$Toast = Toast

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(List);
Vue.use(Cell);
Vue.use(Row);
Vue.use(Col);
Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(Overlay);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
