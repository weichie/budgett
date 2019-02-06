import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Home from './components/views/Home'
import Dashboard from './components/views/Dashboard'
import Income from './components/views/Income'
import Expenses from './components/views/Expenses'
import Clients from './components/views/Clients'

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
   },{
      path: '/expenses',
      name: 'expenses',
      component: Expenses,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/income',
      name: 'income',
      component: Income,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/clients',
      name: 'clients',
      component: Clients,
      meta: {
         requiresAuth: true
      }
   }
];