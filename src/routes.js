import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Home from './components/views/Home'
import Dashboard from './components/views/Dashboard'

export const routes = [
   {
      path: '*',
      redirect: '/login'
   },{ 
      path: '/',
      name: 'home',
      component: Home,
   },{ 
      path: '/login',
      name: 'login',
      component: Login
   },{ 
      path: '/register', 
      name: 'register',
      component: Register 
   },{
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
         requiresAuth: true
      }
   }
];