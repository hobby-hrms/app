import Vue from 'vue'
import Router from 'vue-router'
import { extend, omit } from 'lodash'

const lazyLoadComponent = async (prefix, view) => {
  return await import(`@/views/${prefix}/${view}View`)
}

function route(prefix, path, view, redirect, children) {
  let routeOptions = {
    path,
    name: view,
    component: resolve => lazyLoadComponent(prefix, view)
  }

  if (typeof redirect !== 'undefined') {
    routeOptions = extend({ redirect }, routeOptions)
  }

  if (typeof children !== 'undefined') {
    routeOptions = extend({ children: [...children] }, routeOptions)
    routeOptions = omit(routeOptions, 'name')
  }

  return routeOptions
}

function childRoute(prefix, path, view, redirect) {
  return {
    path,
    name: view,
    component: resolve => lazyLoadComponent(prefix, view)
  }
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    route('common', '/', 'Welcome', '/login'),
    route('common', '/login', 'Login'),
    route('common', '/password-reset', 'PasswordReset'),
    route('common', '/new-password', 'NewPassword'),
    route('employee', '/registration', 'NewEmployeeRegistration'),
    route('common', '/dashboard', 'Dashboard', undefined, [
      childRoute('common', '', 'Home'),
      childRoute('common', 'profile', 'ProfileDetails'),
      childRoute('common', 'update-password', 'ProfilePassword'),
      childRoute('employee', 'attendance', 'Attendance'),
      childRoute('employee', 'claims', 'Claims'),
      childRoute('employee', 'leaves', 'Leaves'),
      childRoute('employee', 'leaves/history', 'LeavesHistory'),
      childRoute('admin', 'employee', 'ManageEmployee'),
      childRoute('admin', 'employee/new', 'NewEmployee'),
    ]),
    route('common', '/error', 'Error'),
    // Global redirect for 404
    {
      path: '*',
      redirect: '/error'
    }
  ]
})
