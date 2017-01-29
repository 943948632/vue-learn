import Vue from 'vue'
import VueRouter from 'vue-router'

// 载入路由表配置
import { navs } from './router_path.toml'

Vue.use(VueRouter)

const routes = navs.map(route => {
  return createRoute(route)
})

// 编译路由
function createRoute(route) {

  let result = {}
  result.name = route.name
  result.path = route.path
  result.meta = route.meta || {}
  result.component = resolve => require(['../router/' + route.router], resolve)

  // 如果存在重定向, 为了逻辑清晰仅接受name参数
  if (route.redirect) {
    result.redirect = { name: route.redirect }
  }

  // 如果存在子路由
  if (route.child) {
    result.children = route.child.map(child => {
      return createRoute(child)
    })
  }

  return result
}

//实例化路由组件
const router = new VueRouter({
  mode: 'history',
  routes
})
module.exports = router
