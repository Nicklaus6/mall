import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
  cartList: new Array(50).fill('')
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3.挂载Vue实例上
export default store