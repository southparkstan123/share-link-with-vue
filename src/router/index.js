import Vue from 'vue'
import Router from 'vue-router'
import LinkPage from '@/views/LinkPage'
import AddLinkPage from '@/views/AddLinkPage'
import EditLinkPage from '@/views/EditLinkPage'
import PageNotFound from '@/views/PageNotFound'
import LoginPage from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'
import {auth} from '../firebase'
import UserService from '../services/user'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LinkPage',
      component: LinkPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add_link',
      name: 'AddLink',
      component: AddLinkPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit_link/:id',
      name: 'editLink',
      component: EditLinkPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    UserService.isAuth((firebaseUser) => {
      if (firebaseUser) {
        next('/')
      } else {
        next('login')
      }
    })
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
